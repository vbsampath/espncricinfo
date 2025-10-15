import type { Client } from "../client";
import { RequestConfig } from "../requestConfig";
import { Urls } from "../urls";
import { XMLParser } from "fast-xml-parser"

export class Summary {
    private xml?: any
    private xmlObj?: any
    private matchIds?: object
    private summary?: object

    constructor(private client: Client) {}

    config: RequestConfig = {
        method: "GET",
        headers: {'user-agent': 'Mozilla/5.0'}
    }
    
    toJSON() {
        return {
            xml: this.xml,
            xmlObj: this.xmlObj,
            matchIds: this.matchIds,
            summary: this.summary
        }
    }

    async getSummary() {
        this.config.url = Urls.GET_SUMMARY
        const response = await this.client.sendRequest(this.config)
        
        const parser = new XMLParser()
        this.xml = response
        this.xmlObj = parser.parse(response);
        this.matchIds = await this.getMatchIds()
        this.summary = await this.getMatchSummaryItems()
        
        return this.toJSON()
    }

    private async getMatchSummaryItems() {
        let items = this.xmlObj?.rss?.channel?.item
        let matchSummaryItems = items.map((item: any) => {
            let guid = item?.guid
            let chunks = guid.split("/")
            let matchId = chunks[chunks.length - 1].replace(".html", "")
            return {matchId: matchId, description: item?.description}
        });
        return matchSummaryItems
    }

    async getMatchIds() {
        let items = this.xmlObj?.rss?.channel?.item
        let matchIds: any = {}
        items.forEach((item: any) => {
            let guid = item?.guid
            let chunks = guid.split("/")
            let matchId = chunks[chunks.length - 1].replace(".html", "")
            matchIds[matchId] = guid.replace(".html", ".json")
        });
        return matchIds
    }
}