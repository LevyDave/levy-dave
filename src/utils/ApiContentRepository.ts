// @ts-nocheck
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Album, Config, Language, PageData, Translations } from "../types";
import { type AssetCache, assetCache } from "./AssetCache.js";
import {
	type CachedContentfulApiClient,
	cachedContentfulApiClient,
} from "./CachedContentfulApiClient.js";

type AssetData = {
	contentType: string;
	base64: string;
};

class ApiContentRepository {
	constructor(
		private readonly contentfulApiClient: CachedContentfulApiClient,
		private readonly assetCache: AssetCache,
	) {}

	async getPageData(): Promise<PageData> {
		const [albums, config, translations, languages] = await Promise.all([
			this.getAlbums(),
			this.getConfig(),
			this.getTranslations(),
			this.getLanguages(),
		]);

		return {
			albums,
			config,
			translations,
			languages,
		} as PageData;
	}

	async getAlbums(): Promise<Album[]> {
		const response =
			await this.contentfulApiClient.getSpaceEntriesByType("album");

		const items = response.items;

		const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(
			response.includes.Asset,
		);

		for (const assetUrl of assetToUrlMap.values()) {
			const assetData = await this.fetchAsset(assetUrl);

			const assetSource = this.buildBase64Source(assetData);

			await this.assetCache.store(assetUrl, assetSource);
		}

		const albums: Album[] = [];
		for (const item of items) {
			albums.push(await this.createAlbumFromItem(item, assetToUrlMap));
		}

		return albums;
	}

	async getConfig(): Promise<Config> {
		const response =
			await this.contentfulApiClient.getSpaceEntriesByType("pageConfig");

		const firstItem = response.items[0];

		const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(
			response.includes.Asset,
		);

		const logoUrl = assetToUrlMap.get(firstItem.fields.logo.en.sys.id);

		const logoAssetData = await this.fetchAsset(logoUrl);

		const logoSource = this.buildBase64Source(logoAssetData);

		await this.assetCache.store(logoUrl, logoSource);

		return {
			purchaseFormUrl: firstItem.fields.purchaseFormUrl.en,
			logoSource: logoSource,
		};
	}

	async getTranslations(): Promise<Translations> {
		const response =
			await this.contentfulApiClient.getSpaceEntriesByType("pageTranslations");

		const firstItem = response.items[0];

		return {
			tracks: this.mapLanguageEntry(
				firstItem.fields.tracks,
				({ value }) => value,
			),
			backButton: this.mapLanguageEntry(
				firstItem.fields.back,
				({ value }) => value,
			),
			orderButton: this.mapLanguageEntry(
				firstItem.fields.orderButton,
				({ value }) => value,
			),
		} as Translations;
	}

	async getLanguages(): Promise<Language[]> {
		const response = await this.contentfulApiClient.getSpace();

		const locales = response.locales as Record<string, string>[];

		return locales.map((locale) => ({
			iso: locale.code,
			name: locale.name,
		})) as Language[];
	}

	async createAlbumFromItem(
		item: object,
		assetToUrlMap: Map<string, string>,
	): Promise<Album> {
		const coverUrl = assetToUrlMap.get(item.fields.cover.en.sys.id);

		if (!coverUrl) {
			throw new Error("Could not find cover entry");
		}

		const coverSource = await assetCache.retrieve(coverUrl);

		return {
			id: item.fields.id.en,
			title: item.fields.title.en,
			description: this.mapLanguageEntry(item.fields.description, ({ value }) =>
				documentToHtmlString(value),
			),
			coverSource: coverSource,
			isAvailableForPurchase: item.fields.isAvailableForOrder.en,
			tracks: item.fields.tracks.en.map((name: string) => ({
				name,
			})),
		} as Album;
	}

	mapLanguageEntry(
		languageEntry: Record<string, unknown>,
		callable: (data: { languageIso: string; value: unknown }) => unknown,
	) {
		return Object.fromEntries(
			Object.entries(languageEntry).map(([languageIso, value]) => [
				languageIso,
				callable({ languageIso, value }),
			]),
		);
	}

	buildAssetIdToUrlMapFromIncludes(assets: object[]) {
		const result = new Map();

		for (const asset of assets) {
			result.set(asset.sys.id, asset.fields.file.en.url);
		}

		return result;
	}

	private async fetchAsset(url: string): Promise<AssetData> {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();

		const contentType = response.headers.get("content-type");

		if (!contentType) {
			throw new Error("Could not find content-type");
		}

		const base64 = btoa(
			new Uint8Array(buffer).reduce(
				(data, byte) => data + String.fromCharCode(byte),
				"",
			),
		);

		return {
			contentType,
			base64,
		};
	}

	private buildBase64Source(assetData: AssetData): string {
		return `data:${assetData.contentType};base64,${assetData.base64}`;
	}
}

export const contentRepository = new ApiContentRepository(
	cachedContentfulApiClient,
	assetCache,
);
