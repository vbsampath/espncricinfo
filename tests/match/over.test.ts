import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"
import { getOverDetails } from "../../src/api/parameters"

const client = new EspnCricinfoClient()
const matchId = 1495281
const seriesId = 8043

test("getOverDetails (Details) function", async() => {
    let params: getOverDetails = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "details",
        overNumber: 1
    }
    let details = await client.match.getOverDetails(params)
    expect(details).toBeTruthy()
})

test("getOverDetails (Comments) function", async() => {
    let params: getOverDetails = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "comments",
        overNumber: 1
    }
    let comments = await client.match.getOverDetails(params)
    expect(comments).toBeTruthy()
})

test("getOverDetails (Comments) function invalid innings", async() => {
    let params: getOverDetails = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "comments",
        overNumber: -1
    }
    
    await expect(client.match.getOverDetails(params)).rejects.toThrowError()
})

