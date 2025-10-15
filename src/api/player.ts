import type { Client } from "../client";
import { RequestConfig } from "../requestConfig";
import { Urls } from "../urls";

export class Player {
    private playerId?: number
    private url?: string
    private jsonUrl?: string
    private name?: string
    private firstName?: string
    private fullName?: string
    private displayName?: string
    private dateOfBirth?: Date
    private currentAge?: number
    private playingRole?: string
    private battingStyle?: string
    private bowlingStyle?: string
    private majorTeams?: any

    // extra fields
    private stats?: any

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
            playerId: this.playerId,
            url: this.url,
            jsonUrl: this.jsonUrl,
            name: this.name,
            firstName: this.firstName,
            fullName: this.fullName,
            displayName: this.displayName,
            dateOfBirth: this.dateOfBirth,
            currentAge: this.currentAge,
            playingRole: this.playingRole,
            battingStyle: this.battingStyle,
            bowlingStyle: this.bowlingStyle,
            majorTeams: this.majorTeams,
            stats: this.stats
        }
    }

    async getPlayer(playerId: number) {
        this.playerId = playerId
        let player = await this.getPlayerDetails(playerId)
        this.bindPlayerData(player)
        return this.toJSON()
    }

    async getPlayerDetails(playerId: number) {
        this.playerId = playerId
        this.config.url = Urls.GET_PLAYER_DETAILS.replace(":playerId", String(playerId))
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async bindPlayerData(player: any) {
        this.url = `https://www.espncricinfo.com/player/player-name-${this.playerId}`
        this.jsonUrl = `http://core.espnuk.org/v2/sports/cricket/athletes/${this.playerId}`
        this.name = player?.name
        this.firstName = player?.firstName
        this.fullName = player?.fullName
        this.displayName = player?.displayName
        this.dateOfBirth = new Date(player?.dateOfBirth)
        this.currentAge = player?.age
        this.playingRole = player?.position
        this.battingStyle = this.getStyle(player?.style, "batting")
        this.bowlingStyle = this.getStyle(player?.style, "bowling")
    }

    private getStyle(styleArray: any, targetStyle: string) {
        let style = styleArray.filter((style: any) => style.type === targetStyle)
        return style
    }

    private async getTeam(url: string) {
        this.config.url = url
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async getTeams(playerId: number) {
        let player = await this.getPlayerDetails(playerId)
        let teams = player?.majorTeams
        let teamsList = await Promise.all(
            teams.map(async (team: any) => await this.getTeam(team["$ref"]) )
        )
        this.majorTeams = teamsList
        return teamsList
    }

    async getPlayerStats(playerId: number) {
        this.config.url = Urls.GET_PLAYER_STATS.replace(":playerId", String(playerId))
        const response = await this.client.sendRequest(this.config)
        let stats = response?.splits?.categories?.[0]?.stats
        this.stats = stats
        return stats
    }
}