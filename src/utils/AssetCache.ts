import {get, set} from 'idb-keyval';
import {AssetCachePort} from "../types";

class AssetCache implements AssetCachePort {

    async fetchAndStore(url: string) {
        const existing = await this.retrieveBase64Src(url);

        if (existing) {
            return;
        }

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        const contentType = response.headers.get('content-type');

        const base64String = btoa(
            new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const src = `data:${contentType};base64,${base64String}`;

        await set(url, src);
    }

    async retrieveBase64Src(url: string): Promise<string | null> {
        return (await get(url)) ?? null;
    }
}

export const assetCache = new AssetCache();