import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"
import { getMatchSummary } from "../../src/api/parameters"

const client = new EspnCricinfoClient()
const matchId = 1495281
const seriesId = 8043

test("getMatchSummary (Fall of Wickets) function invalid innings", async() => {
    let params: getMatchSummary = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "summary",
        innings: 5
    }
    
    await expect(client.match.getMatchSummary(params)).rejects.toThrowError()
})

test("getMatchSummary (Summary) function", async() => {
    let params: getMatchSummary = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "summary",
    }
    let summary = await client.match.getMatchSummary(params)
    expect(summary).toBeTruthy()
    expect(summary).toHaveProperty('header.id', String(matchId))
    expect(summary).toHaveProperty('gameInfo.venue.fullName', "W.A.C.A. Ground, Perth")
})

test("getMatchSummary (Fall of Wickets) function", async() => {
    let params: getMatchSummary = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "fow",
        innings: 1
    }
    let fow = await client.match.getMatchSummary(params)
    expect(fow).toBeTruthy()
    expect(fow).toHaveProperty('[0].athlete.name', "Sam Konstas")
})

test("getMatchSummary (Rosters) function", async() => {
    let params: getMatchSummary = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "rosters",
    }
    let fow = await client.match.getMatchSummary(params)
    expect(fow).toBeTruthy()
    expect(fow).toHaveProperty('[0].team.displayName', "Western Australia")
})

test("getMatchSummary (Venue) function", async() => {
    let params: getMatchSummary = {
        matchId: matchId,
        seriesId: seriesId,
        dataType: "venue",
    }
    let venue = await client.match.getMatchSummary(params)
    expect(venue).toBeTruthy()
    expect(venue).toHaveProperty('fullName', "W.A.C.A. Ground, Perth")
})

