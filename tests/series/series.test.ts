import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"

const client = new EspnCricinfoClient()
const seriesId = 8043

test("getSeries function", async() => {
    let series = await client.series.getSeries(seriesId)
    expect(series).toBeTruthy()
    expect(series).toHaveProperty('seriesId', seriesId)
})

test("getSeriesDetails function", async() => {
    let seriesDetails = await client.series.getSeriesDetails(seriesId)
    expect(seriesDetails).toBeTruthy()
    expect(seriesDetails).toHaveProperty('id', String(seriesId))
})

test("getSeasons function", async() => {
    let params = {
        seriesId,
        page: 1
    }
    let seasons = await client.series.getSeasons(params)
    expect(seasons).toBeTruthy()
    expect(seasons).toHaveProperty('[0].id', String(seriesId))
})

test("getSeasons function invalid page", async() => {
    let params = {
        seriesId,
        page: 0
    }
    
    await expect(client.series.getSeasons(params)).rejects.toThrowError()
})

test("getEvents function", async() => {
    let params = {
        seriesId,
        page: 1
    }
    let seasons = await client.series.getEvents(params)
    expect(seasons).toBeTruthy()
})

test("getEvents function invalid page", async() => {
    let params = {
        seriesId,
        page: 0
    }
    
    await expect(client.series.getEvents(params)).rejects.toThrowError()
})

