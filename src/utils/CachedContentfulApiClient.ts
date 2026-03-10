import {
	type ContentfulApiClient,
	contentfulApiClient,
} from "./ContentfulApiClient.js";
import { IdbStorage } from "./IdbStorage";

export class CachedContentfulApiClient {
	private storage: IdbStorage;

	constructor(private readonly baseApiClient: ContentfulApiClient) {
		this.storage = new IdbStorage("cachedContentfulApiClient");
	}

	async getSpaceEntriesByType(contentType: string) {
		const cacheKey = `getSpaceEntriesByType-${contentType}`;

		const cachedResult = await this.storage.retrieve(cacheKey);

		if (cachedResult) {
			return JSON.parse(cachedResult);
		}

		const result = await this.baseApiClient.getSpaceEntriesByType(contentType);

		await this.storage.store(cacheKey, JSON.stringify(result), 3600);

		return result;
	}

	async getSpace() {
		const cacheKey = "getSpace";

		const cachedResult = await this.storage.retrieve(cacheKey);

		if (cachedResult) {
			return JSON.parse(cachedResult);
		}

		const result = await this.baseApiClient.getSpace();

		await this.storage.store(cacheKey, JSON.stringify(result), 3600);

		return result;
	}
}

export const cachedContentfulApiClient = new CachedContentfulApiClient(
	contentfulApiClient,
);
