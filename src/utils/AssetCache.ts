import { IdbStorage } from "./IdbStorage";

export class AssetCache {
	private readonly storage: IdbStorage;

	constructor() {
		this.storage = new IdbStorage("asset");
	}

	async store(url: string, data: string) {
		await this.storage.store(url, data);
	}

	async retrieve(url: string): Promise<string | null> {
		return await this.storage.retrieve(url);
	}
}

export const assetCache = new AssetCache();
