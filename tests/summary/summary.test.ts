import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"

const client = new EspnCricinfoClient()

test("getSummary function", async() => {
    let summary = await client.summary.getSummary()
    expect(summary).toBeTruthy()
    expect(summary).toHaveProperty('summary.[0].matchId')
})

test("getMatchIds function", async() => {
    let summary = await client.summary.getSummary()
    let matchIds = await client.summary.getMatchIds()
    expect(matchIds).toBeTruthy()
})
