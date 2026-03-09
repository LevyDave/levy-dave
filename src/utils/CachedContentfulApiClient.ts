import {localStorageClient} from "./LocalStorageClient.js";
import {contentfulApiClient} from "./ContentfulApiClient.js";
import {ContentfulApiClientPort} from "../types";

class CachedContentfulApiClient implements ContentfulApiClientPort {
    constructor(
        private readonly baseApiClient: ContentfulApiClientPort
    ) {
    }

    async getSpaceEntriesByType(contentType: string) {
        const cacheKey = `cachedContentfulApiClient-getSpaceEntriesByType-${contentType}`;

        const cachedResult = localStorageClient.get(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const result = await this.baseApiClient.getSpaceEntriesByType(contentType);

        localStorageClient.persist(cacheKey, result, 3600);

        return result;
    }

    async getSpace() {
        const cacheKey = `cachedContentfulApiClient-getSpace`;

        const cachedResult = localStorageClient.get(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const result = await this.baseApiClient.getSpace();

        localStorageClient.persist(cacheKey, result, 3600);

        return result;
    }
}

export const cachedContentfulApiClient = new CachedContentfulApiClient(
    contentfulApiClient
)