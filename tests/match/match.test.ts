import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"

const client = new EspnCricinfoClient()
const matchId = 1495281
const seriesId = 8043
const playerId = 501011 // Cameron Bancroft from Australia

test("getMatch function", async() => {
    let match = await client.match.getMatch(matchId)
    expect(match).toBeTruthy()
    expect(match).toHaveProperty('seriesName', "Sheffield Shield")
    expect(match).toHaveProperty('seriesId', seriesId)
})

test("inTeamForMatch function", async() => {
    let isInForMatch = await client.match.inTeamForMatch(playerId, matchId)
    expect(isInForMatch).toBeTruthy()
})

