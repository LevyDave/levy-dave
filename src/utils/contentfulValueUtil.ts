import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Asset, UnresolvedLink } from "contentful";

type LocalizedMaybeAsset = Record<
	string,
	UnresolvedLink<"Asset"> | Asset<"WITH_ALL_LOCALES", string> | undefined
>;

type LocalizedTranslation = Record<string, string | undefined>;

export const asLocalizedAsset = (
	localizedMaybeAsset: LocalizedMaybeAsset,
	languageIso: string,
) => {
	if (!localizedMaybeAsset) {
		throw new Error("Not asset");
	}

	const maybeAsset = localizedMaybeAsset[languageIso];

	if (!maybeAsset) {
		throw new Error("Not asset");
	}

	if (!("fields" in maybeAsset)) {
		throw new Error("Not asset");
	}

	return maybeAsset;
};

export const getAssetUrl = (localizedAsset: LocalizedMaybeAsset): string => {
	try {
		const asset = asLocalizedAsset(localizedAsset, "en");

		const assetFile = asset.fields.file?.en;

		if (!assetFile) {
			return "";
		}

		return assetFile.url;
	} catch (_error) {
		return "";
	}
};

export const getTranslationValue = (
	localizedTranslation: LocalizedTranslation,
	languageIso: string,
): string => {
	return localizedTranslation?.[languageIso] ?? "";
};

export const getHtmlString = (
	localizedDocument: Record<string, Document | undefined>,
	languageIso: string,
): string => {
	const document = localizedDocument[languageIso] ?? null;

	if (!document) {
		return "";
	}

	return documentToHtmlString(document);
};
