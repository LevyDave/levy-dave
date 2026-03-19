import type {
	Entry,
	EntryCollection,
	EntryFieldTypes,
	Locale,
	LocaleCollection,
} from "contentful";

export type RouteParams = {
	languageIso: string;
	id: string;
};

export interface AlbumSkeleton {
	contentTypeId: "album";
	fields: {
		id: EntryFieldTypes.Text;
		title: EntryFieldTypes.Text;
		description: EntryFieldTypes.RichText;
		tracks: EntryFieldTypes.Text;
		cover: EntryFieldTypes.AssetLink;
		isAvailableForOrder: EntryFieldTypes.Boolean;
	};
}

export interface PageConfigSkeleton {
	contentTypeId: "pageConfig";
	fields: {
		purchaseFormUrl: EntryFieldTypes.Text;
		logo: EntryFieldTypes.AssetLink;
		albums: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AlbumSkeleton>>;
	};
}

export interface PageTranslationsSkeleton {
	contentTypeId: "pageTranslations";
	fields: {
		tracks: EntryFieldTypes.Text;
		back: EntryFieldTypes.Text;
		orderButton: EntryFieldTypes.Text;
		seeAlbum: EntryFieldTypes.Text;
		aboutLabel: EntryFieldTypes.Text;
		shop: EntryFieldTypes.Text;
		oWydawnictwie: EntryFieldTypes.RichText;
	};
}

export type LocalizedAlbums = EntryCollection<
	AlbumSkeleton,
	"WITH_ALL_LOCALES"
>["items"];

export type LocalizedAlbum = LocalizedAlbums[number];

export type LocalizedPageConfig = Entry<PageConfigSkeleton, "WITH_ALL_LOCALES">;

export type LocalizedPageTranslations = Entry<
	PageTranslationsSkeleton,
	"WITH_ALL_LOCALES"
>;

export interface ContentfulClient {
	getAlbums(): Promise<LocalizedAlbums>;

	getPageConfig(): Promise<LocalizedPageConfig>;

	getPageTranslations(): Promise<LocalizedPageTranslations>;

	getLocales(): Promise<LocaleCollection>;
}

export type PageData = {
	albums: LocalizedAlbum[];
	pageConfig: LocalizedPageConfig;
	pageTranslations: LocalizedPageTranslations;
	locales: LocaleCollection;
	defaultLocale: Locale;
};
