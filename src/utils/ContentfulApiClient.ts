export class ContentfulApiClient {
	constructor(
		private readonly environment: string,
		private readonly baseUrl: string,
		private readonly spaceId: string,
		private readonly token: string,
	) {}

	async getSpaceEntriesByType(contentType: string) {
		return await this.makeRequest(
			"GET",
			`/spaces/${this.spaceId}/environments/${this.environment}/entries?access_token=${this.token}&content_type=${contentType}&locale=*`,
		);
	}

	async getSpace() {
		return await this.makeRequest(
			"GET",
			`/spaces/${this.spaceId}?access_token=${this.token}`,
		);
	}

	private async makeRequest(method: string, url: string) {
		const response = await fetch(this.baseUrl + url, {
			method,
		});

		return await response.json();
	}
}

export const contentfulApiClient = new ContentfulApiClient(
	"master",
	"https://cdn.contentful.com",
	"s0gx44xxmrcg",
	"KWUJeOVdnN909Pxn0O-5R47BKIZs6HRLAytOMvXJiQ0",
);
