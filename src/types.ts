export interface ContentfulApiClientPort {
    getSpaceEntriesByType(contentType: string): Promise<object>;

    getSpace(): Promise<object>;
}

export interface AssetCachePort {
    fetchAndStore(url: string): Promise<void>;

    retrieveBase64Src(url: string): Promise<string | null>;
}

export type Album = {
    id: string,
    title: string,
    description: Record<string, string>,
    coverSrc: string,
    isAvailableForPurchase: boolean,
    tracks: {
        name: string
    }[]
}

export type Config = {
    purchaseFormUrl: string,
    logoSrc: string
}

export type Translations = {
    tracks: Record<string, string>,
    backButton: Record<string, string>,
    orderButton: Record<string, string>,
}

export type Language = {
    iso: string,
    name: string,
}

export type PageData = {
    translations: Translations,
    config: Config,
    albums: Album[],
    languages: Language[],
}

export type RouteParams = {
    languageIso: string,
    id: string
}