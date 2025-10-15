import { expect, test } from "vitest"
import { EspnCricinfoClient } from "../../src/index"

const client = new EspnCricinfoClient()
const playerId = 501011 // Cameron Bancroft from Australia

test("getPlayer function", async() => {
    let player = await client.player.getPlayer(playerId)
    expect(player).toBeTruthy()
    expect(player).toHaveProperty('playerId', playerId)
})

test("getPlayer function error scenarios ", async() => {
    await expect(client.player.getPlayer(111)).rejects.toThrowError("Request failed with status code 404")
})

test("getPlayerDetails function", async() => {
    let playerDetails = await client.player.getPlayerDetails(playerId)
    expect(playerDetails).toBeTruthy()
    expect(playerDetails).toHaveProperty('id', String(playerId))
    expect(playerDetails).toHaveProperty('name', "Cameron Bancroft")
})

test("getTeams function", async() => {
    let teams = await client.player.getTeams(playerId)
    expect(teams).toBeTruthy()
    expect(teams).toHaveProperty('[0].name', "Australia")
})

test("getPlayerStats function", async() => {
    let stats = await client.player.getPlayerStats(playerId)
    expect(stats).toBeTruthy()
})
