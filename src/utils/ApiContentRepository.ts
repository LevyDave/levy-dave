// @ts-nocheck
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {cachedContentfulApiClient} from "./CachedContentfulApiClient.js";
import {assetCache} from "./AssetCache.js";
import {Album, AssetCachePort, Config, ContentfulApiClientPort, Language, PageData, Translations} from "../types";

class ApiContentRepository {

    constructor(
        private readonly contentfulApiClient: ContentfulApiClientPort,
        private readonly assetCache: AssetCachePort
    ) {
    }

    async getPageData(): Promise<PageData> {
        const [albums, config, translations, languages] = await Promise.all([
            this.getAlbums(),
            this.getConfig(),
            this.getTranslations(),
            this.getLanguages()
        ])

        return {
            albums,
            config,
            translations,
            languages
        } as PageData
    }

    async getAlbums(): Promise<Album[]> {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('album');

        const items = response.items;

        const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(response.includes.Asset);

        for (const assetUrl of assetToUrlMap.values()) {
            await this.assetCache.fetchAndStore(assetUrl);
        }

        const albums: Album[] = [];
        for (const item of items) {
            albums.push(await this.createAlbumFromItem(item, assetToUrlMap));
        }

        return albums;
    }

    async getConfig(): Promise<Config> {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('pageConfig');

        const firstItem = response.items[0];

        const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(response.includes.Asset);

        const logoUrl = assetToUrlMap.get(firstItem.fields.logo.en.sys.id);

        await this.assetCache.fetchAndStore(logoUrl);

        const logoSrc = await this.assetCache.retrieveBase64Src(logoUrl);

        return {
            purchaseFormUrl: firstItem.fields.purchaseFormUrl.en,
            logoSrc: logoSrc
        } as Config;
    }

    async getTranslations(): Promise<Translations> {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('pageTranslations');

        const firstItem = response.items[0];

        return {
            tracks: this.mapLanguageEntry(firstItem.fields.tracks, ({value}) => value),
            backButton: this.mapLanguageEntry(firstItem.fields.back, ({value}) => value),
            orderButton: this.mapLanguageEntry(firstItem.fields.orderButton, ({value}) => value),
        } as Translations;
    }

    async getLanguages(): Promise<Language[]> {
        const response = await this.contentfulApiClient.getSpace();

        const locales = response.locales as Record<string, string>[];

        return locales.map((locale) => ({
            iso: locale.code,
            name: locale.name
        })) as Language[];
    }

    async createAlbumFromItem(item: object, assetToUrlMap: Map<string, string>): Promise<Album> {

        const coverUrl = assetToUrlMap.get(item.fields.cover.en.sys.id);

        if (!coverUrl) {
            throw new Error('Could not find cover entry');
        }

        const coverSrc = await assetCache.retrieveBase64Src(coverUrl)

        return {
            id: item.fields.id.en,
            title: item.fields.title.en,
            description: this.mapLanguageEntry(item.fields.description, ({value}) => documentToHtmlString(value)),
            coverSrc: coverSrc,
            isAvailableForPurchase: item.fields.isAvailableForOrder.en,
            tracks: item.fields.tracks.en.map((name: string) => ({
                name
            }))
        } as Album;
    }

    mapLanguageEntry(languageEntry: Record<string, unknown>, callable: (data: {
        languageIso: string,
        value: unknown
    }) => unknown) {
        return Object.fromEntries(
            Object.entries(languageEntry).map(([languageIso, value]) => [languageIso, callable({languageIso, value})])
        );
    }

    buildAssetIdToUrlMapFromIncludes(assets: object[]) {
        const result = new Map();

        for (const asset of assets) {
            result.set(
                asset.sys.id,
                asset.fields.file.en.url
            )
        }

        return result;

    }
}

export const contentRepository = new ApiContentRepository(
    cachedContentfulApiClient,
    assetCache
);