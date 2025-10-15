import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"
import { statsForMatch } from "../../src/api/parameters"

const client = new EspnCricinfoClient()
const matchId = 1495281
const seriesId = 8043

test("statsForMatch (Batting) function", async() => {
    let params: statsForMatch = {
        matchId: matchId,
        seriesId: seriesId,
        statType: "batting"
    }
    let batting = await client.match.statsForMatch(params)
    expect(batting).toBeTruthy()
})

test("statsForMatch (Bowling) function", async() => {
    let params: statsForMatch = {
        matchId: matchId,
        seriesId: seriesId,
        statType: "bowling"
    }
    let bowling = await client.match.statsForMatch(params)
    expect(bowling).toBeTruthy()
})

test("getOverDetails (Comments) function invalid innings", async() => {
    let params: statsForMatch = {
        matchId: matchId,
        seriesId: -1,
        statType: "batting"
    }
    
    await expect(client.match.statsForMatch(params)).rejects.toThrowError()
})

