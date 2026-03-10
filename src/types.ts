export type Album = {
	id: string;
	title: string;
	description: Record<string, string>;
	coverSource: string;
	isAvailableForPurchase: boolean;
	tracks: {
		name: string;
	}[];
};

export type Config = {
	purchaseFormUrl: string;
	logoSource: string;
};

export type Translations = {
	tracks: Record<string, string>;
	backButton: Record<string, string>;
	orderButton: Record<string, string>;
};

export type Language = {
	iso: string;
	name: string;
};

export type PageData = {
	translations: Translations;
	config: Config;
	albums: Album[];
	languages: Language[];
};

export type RouteParams = {
	languageIso: string;
	id: string;
};
