import type { Client } from "../client";
import { RequestConfig } from "../requestConfig";
import { Urls } from "../urls";
import { getSeasons, getSeasonsSchema, getEvents, getEventsSchema } from "./parameters";

const itemsPerPage = 5 // max number of items per page

export class Series {
    private seriesId?: number
    private url?: string
    private eventsUrl?: string
    private seasonsUrl?: string
    private seasons?: any
    private name?: string
    private shortName?: string
    private slug?: string
    private seriesUrl?: string
    
    private events?: any
    
    // schemas
    private params?: any

    constructor(private client: Client) {}

    config: RequestConfig = {
        method: "GET",
        headers: {
            'user-agent': 'Mozilla/5.0',
            "Content-Type": "application/json; charset=utf-8"
        }
    }

    toJSON() {
        return {
            seriesId: this.seriesId,
            url: this.url,
            eventsUrl: this.eventsUrl,
            seasonsUrl: this.seasonsUrl,
            
            name: this.name,
            firstName: this.shortName,
            slug: this.slug,
            seriesUrl: this.seriesUrl,
            events: this.events,
            seasons: this.seasons,
        }
    }

    async getSeries(seriesId: number) {
        this.seriesId = seriesId
        let series = await this.getSeriesDetails(seriesId)
        this.bindSeriesData(series)
        return this.toJSON()
    }

    async getSeriesDetails(seriesId: number) {
        this.seriesId = seriesId
        this.config.url = Urls.GET_SERIES_DETAILS.replace(":seriesId", String(seriesId))
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async bindSeriesData(series: any) {
        this.url = Urls.GET_SERIES_DETAILS.replace(":seriesId", String(this.seriesId))
        this.eventsUrl = Urls.GET_EVENTS_DETAILS.replace(":seriesId", String(this.seriesId))
        this.seasonsUrl = Urls.GET_SEASONS_DETAILS.replace(":seriesId", String(this.seriesId))
        this.name = series?.name
        this.shortName = series?.shortName
        this.slug = series?.slug
        this.seriesUrl = series?.links?.[0]?.href
    }

    async getDetail(url: string) {
        this.config.url = url
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async getSeasons(params: getSeasons) {
        try {
            this.params = getSeasonsSchema.parse(params)
        } catch (error: any) {
            throw error
        }
        const {seriesId, page} = params
        this.config.url = Urls.GET_SEASONS_DETAILS.replace(":seriesId", String(seriesId))
        const response = await this.client.sendRequest(this.config)
        let count = response?.count
        let pageSize = response?.pageSize
        let pagesLoaded = pageSize/itemsPerPage
        let seasonUrls = response?.items

        let pages = Math.floor(count/itemsPerPage)
        const remainder = count % itemsPerPage
        if (remainder > 0) pages = pages + 1
        let seasonDetails, start = 0, end = 0
        if (page < pagesLoaded && page > pages) throw Error("Season does not exists")
        if (page > pagesLoaded && page < pages) throw Error("Not implemented")
        
        start = (page - 1) * itemsPerPage
        end = page * itemsPerPage
        
        let urls = seasonUrls.slice(start, end)
        seasonDetails = await Promise.all(
            urls.map(async (url: any) => await this.getDetail(url["$ref"]) )
        )
        return seasonDetails
    }

    async getEvents(params: getEvents) {
        try {
            this.params = getEventsSchema.parse(params)
        } catch (error: any) {
            throw error
        }
        const {seriesId, page} = params
        this.config.url = Urls.GET_EVENTS_DETAILS.replace(":seriesId", String(seriesId))
        const response = await this.client.sendRequest(this.config)
        let count = response?.count
        let pageSize = response?.pageSize
        let pagesLoaded = pageSize/itemsPerPage
        let eventUrls = response?.items

        let pages = Math.floor(count/itemsPerPage)
        const remainder = count % itemsPerPage
        if (remainder > 0) pages = pages + 1
        let eventDetails, start = 0, end = 0
        if (page < pagesLoaded && page > pages) throw Error("Event does not exists")
        if (page > pagesLoaded && page < pages) throw Error("Not implemented")
        
        start = (page - 1) * itemsPerPage
        end = page * itemsPerPage
        
        let urls = eventUrls.slice(start, end)
        eventDetails = await Promise.all(
            urls.map(async (url: any) => await this.getDetail(url["$ref"]) )
        )
        return eventDetails
    }
}