import type { Client } from "../client";
import { RequestConfig } from "../requestConfig";
import { Urls } from "../urls";
import type * as Parameters from "./parameters"
import { 
    getMatchSummary,
    getMatchSummarySchema,
    getOverDetailsSchema,
    statsForMatch,
    statsForMatchSchema
} from "./parameters";

const page = 1
const number = 6 // max number of balls in an over

export class Match {
    private matchId?: number
    private matchUrl?: string
    private detailsUrl?: string
    private jsonUrl?: string
    private status?: string
    private matchClass?: string
    private season?: string
    private description?: string
    private legacyScorecardUrl?: string
    private series?: any
    private seriesName?: string
    public seriesId?: number
    private eventUrl?: string
    private officials?: any
    private currentSummary?: string
    private presentDatetimeLocal?: Date
    private presentDatetimeGMT?: Date
    private startDatetimeLocal?: Date
    private startDatetimeGMT?: Date
    private cancelledMatch?: boolean
    private rainRule?: string
    private date?: Date
    private continent?: string
    private townArea?: string
    private townName?: string
    private townId?: string
    private weatherLocationCode?: string
    private matchTitle?: string
    private result?: string
    private groundId?: string
    private groundName?: string
    private lighting?: string
    private followon?: boolean
    private scheduledOvers?: number
    private inningsList?: any
    private innings?: any
    private latestBatting?: string
    private latestBowling?: string
    private latestInnings?: string
    private latestInningsFow?: string
    private team1?: any
    private team1Id?: string
    private team1Abbreviation?: string
    public team1Players?: any
    private team1Innings?: any
    private team1RunRate?: number
    private team1OversBatted?: number
    private team1BattingResult?: string
    private team2?: any
    private team2Id?: string
    private team2Abbreviation?: string
    public team2Players?: any
    private team2Innings?: any
    private team2RunRate?: number
    private team2OversBatted?: number
    private team2BattingResult?: string
    private homeTeam?: any
    private battingFirst?: any
    private matchWinner?: any
    private tossWinner?: any
    private tossDecision?: string
    private tossDecisionName?: string
    private tossChoiceTeamId?: string
    private tossWinnerTeamId?: string
    private espnApiUrl?: string

    // match details json calls
    private comments?: any
    private overs?: any
    private oversCount?: number

    // match summary json calls
    private summary?: any
    private rosters?: any
    private fallOfWickets?: any
    private venue?: any

    // schemas
    private params?: any

    public constructor(private client: Client) {}

    config: RequestConfig = {
        method: "GET",
        headers: {
            'user-agent': 'Mozilla/5.0',
            "Content-Type": "application/json; charset=utf-8"
        }
    }

    toJSON() {
        return {
            matchUrl: this.matchUrl,
            jsonUrl: this.jsonUrl,
            status: this.status,
            matchClass: this.matchClass,
            season: this.season,
            description: this.description,
            legacyScorecardUrl: this.legacyScorecardUrl,
            series: this.series,
            seriesName: this.seriesName,
            seriesId: this.seriesId,
            eventUrl: this.eventUrl,
            detailsUrl: this.detailsUrl,
            officials: this.officials,
            currentSummary: this.currentSummary,
            presentDatetimeLocal: this.presentDatetimeLocal,
            presentDatetimeGMT: this.presentDatetimeGMT,
            startDatetimeLocal: this.startDatetimeLocal,
            startDatetimeGMT: this.startDatetimeGMT,
            cancelledMatch: this.cancelledMatch,
            rainRule: this.rainRule,
            date: this.date,
            continent: this.continent,
            townArea: this.townArea,
            townName: this.townName,
            townId: this.townId,
            weatherLocationCode: this.weatherLocationCode,
            matchTitle: this.matchTitle,
            result: this.result,
            groundId: this.groundId,
            groundName: this.groundName,
            lighting: this.lighting,
            followon: this.followon,
            scheduledOvers: this.scheduledOvers,
            inningsList: this.inningsList,
            innings: this.innings,
            latestBatting: this.latestBatting,
            latestBowling: this.latestBowling,
            latestInnings: this.latestInnings,
            latestInningsFow: this.latestInningsFow,

            // Team assignment
            team1: this.team1,
            team1Id: this.team1Id,
            team1Abbreviation: this.team1Abbreviation,
            team1Players: this.team1Players,
            team1Innings: this.team1Innings,
            team1RunRate: this.team1RunRate,
            team1OversBatted: this.team1OversBatted,
            team1BattingResult: this.team1BattingResult,
            team2: this.team2,
            team2Id: this.team2Id,
            team2Abbreviation: this.team2Abbreviation,
            team2Players: this.team2Players,
            team2Innings: this.team2Innings,
            team2RunRate: this.team2RunRate,
            team2OversBatted: this.team2OversBatted,
            team2BattingResult: this.team2BattingResult,

            // status is not dormant
            homeTeam: this.homeTeam,
            battingFirst: this.battingFirst,
            matchWinner: this.matchWinner,
            tossWinner: this.tossWinner,
            tossDecision: this.tossDecision,
            tossDecisionName: this.tossDecisionName,
            tossChoiceTeamId: this.tossChoiceTeamId,
            tossWinnerTeamId: this.tossWinnerTeamId,
            espnApiUrl: this.espnApiUrl,

            // custom fields over details
            oversCount: this.oversCount,
            overs: this.overs,
            comments: this.comments,

            // custom fields summary
            summary: this.summary,
            fallOfWickets: this.fallOfWickets,
            rosters: this.rosters,
            venue: this.venue
        }
    }

    public async getMatch(matchId: number) {
        let match = await this.getMatchData(matchId)
        this.bindMatchData(match)
        // match max overs
        this.oversCount = await this.getMatchOvers(matchId, match?.series?.[0]?.core_recreation_id)
        return this.toJSON()
    }

    async getMatchData(matchId: number) {
        this.matchId = matchId
        this.config.url = Urls.GET_MATCH.replace(":matchId", String(matchId))
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async getMatchSummary(params: Parameters.getMatchSummary) {
        try {
            this.params = getMatchSummarySchema.parse(params)
        } catch (error: any) {
            throw error
        }
        const {matchId, seriesId, dataType, innings} = params
        this.config.url = Urls.GET_MATCH_SUMMARY.replace(":matchId", String(matchId)).replace(":seriesId", String(seriesId))
        const response = await this.client.sendRequest(this.config)
        this.summary = response

        if (dataType === "summary") return response
        else if (dataType === "fow") {
            // fall of wickets
            let fallOfWickets: any[] = []
            let competitors = this.summary?.header?.competitions?.[0]?.competitors
            let lineScores1 = competitors?.[0]?.linescores
            let lineScores2 = competitors?.[1]?.linescores
            lineScores1.forEach((lineScore1:any) => {
                lineScores2.forEach((lineScore2:any) => {
                    if (lineScore1?.period === lineScore2.period) {
                        let fallOfWicketForInning = lineScore1.fow || lineScore2.fow
                        fallOfWickets.push(fallOfWicketForInning)
                    }
                })
            })
            this.fallOfWickets = fallOfWickets
            if (innings) return this.fallOfWickets?.[innings - 1]
            else return this.fallOfWickets
        } 
        else if (dataType === "rosters") {
            // rosters
            this.rosters = this.summary?.rosters
            return this.rosters
        }
        else if (dataType === "venue") {
            // ground
            this.venue = this.summary?.gameInfo?.venue
            return this.venue
        }
    }

    async bindMatchData(match: any) {
        let matchData = match?.match
        this.matchUrl = Urls.GET_MATCH.replace(":matchId", String(this.matchId)).replace(".json", ".html")
        this.jsonUrl = Urls.GET_MATCH.replace(":matchId", String(this.matchId))
        this.status = matchData?.match_status
        this.matchClass = matchData?.international_class_card || matchData?.general_class_card
        this.season = matchData?.season
        this.description = match?.description
        this.legacyScorecardUrl = `https://static.espncricinfo.com${matchData?.legacy_url}`
        this.series = match?.series
        this.seriesName = match?.series?.[0]?.series_name
        this.seriesId = match?.series?.[0]?.core_recreation_id
        this.eventUrl = `http://core.espnuk.org/v2/sports/cricket/leagues/${this.seriesId}/events/${this.matchId}`
        this.detailsUrl = `${this.eventUrl}/competitions/${this.matchId}/details?pagesize=${number}&page=${page}`
        this.officials = match?.official
        this.currentSummary = matchData?.current_summary
        this.presentDatetimeLocal = new Date(matchData?.present_datetime_local)
        this.presentDatetimeGMT = new Date(matchData?.present_datetime_gmt)
        this.startDatetimeLocal = new Date(matchData?.start_datetime_local)
        this.startDatetimeGMT = new Date(matchData?.start_datetime_gmt)
        this.cancelledMatch = (matchData?.cancelled_match !== "N")
        this.rainRule = (matchData?.rain_rule === "1")? matchData?.rain_rule_name : ""
        this.date = new Date(matchData?.start_date_raw)
        this.continent = matchData?.continent_name
        this.townArea = matchData?.town_area
        this.townName = matchData?.town_name
        this.townId = matchData?.town_id
        this.weatherLocationCode = matchData?.weather_location_code
        this.matchTitle = matchData?.cms_match_title
        this.result = match?.live?.status
        this.groundId = matchData?.ground_id
        this.groundName = matchData?.ground_name
        this.lighting = matchData?.floodlit_name
        this.followon = (matchData?.followon === "1")
        this.scheduledOvers = parseInt(matchData?.scheduled_overs)
        this.inningsList = match?.center?.common?.innings_list
        this.innings = match?.innings
        this.latestBatting = match?.center?.common?.batting
        this.latestBowling = match?.center?.common?.bowling
        this.latestInnings = match?.center?.common?.innings
        this.latestInningsFow = match?.center?.fow
        
        // Team assignment
        this.team1 = match?.team?.[0]
        this.team1Id = this.team1?.team_id
        this.team1Abbreviation = this.team1?.team_abbreviation
        this.team1Players = this.team1?.player
        this.team1Innings = this.getTeamInnings(match, this.team1Id)
        this.team1RunRate = this.team1Innings?.run_rate || ""
        this.team1OversBatted = this.team1Innings?.overs || ""
        this.team1BattingResult = this.team1Innings?.event_name || ""
        this.team2 = match?.team?.[1]
        this.team2Id = this.team2?.team_id
        this.team2Abbreviation = this.team2?.team_abbreviation
        this.team2Players = this.team2?.player
        this.team2Innings = this.getTeamInnings(match, this.team2Id)
        this.team2RunRate = this.team2Innings?.run_rate
        this.team2OversBatted = this.team2Innings?.overs || ""
        this.team2BattingResult = this.team2Innings?.event_name || ""

        // status is not dormant
        this.homeTeam = (this.team1Id == matchData?.home_team_id)? this.team1Abbreviation : this.team2Abbreviation
        this.battingFirst = (this.team1Id == matchData?.batting_first_team_id)? this.team1Abbreviation : this.team2Abbreviation
        this.matchWinner = (this.team1Id == matchData?.winner_team_id)? this.team1Abbreviation : this.team2Abbreviation
        this.tossWinner = (this.team1Id == matchData?.toss_winner_team_id)? this.team1Id : this.team2Id
        this.tossDecision = this.getTossDecision(match)
        this.tossDecisionName = this.getTossDecisionName(match)
        this.tossChoiceTeamId = matchData?.toss_choice_team_id
        this.tossWinnerTeamId = matchData?.toss_winner_team_id
        this.espnApiUrl = `https://site.api.espn.com/apis/site/v2/sports/cricket/${this.seriesId}/summary?event=${this.matchId}`        
    }

    private getTossDecision(match: any) {
        let decision: string
        if (match?.match?.toss_decision === "" && this.innings.length > 0) {
            decision =  (this.innings?.[0]?.batting_team_id === this.tossWinner)? "1" : "2"
        } else {
            decision = match?.match?.toss_decision
        }
        return decision
    }

    private getTossDecisionName(match: any) {
        let decision: string
        if (match?.match?.toss_decision_name === "" && this.innings.length > 0) {
            decision =  (this.innings?.[0]?.batting_team_id === this.tossWinner)? "bat" : "bowl"
        } else {
            decision = match?.match?.toss_decision_name
        }
        return decision
    }

    private getTeamInnings(match: any, teamId: string| undefined): any {
        let innings: any[] = match?.innings
        let teamInnings = innings.filter((inning: any) => String(inning?.batting_team_id) === teamId)
        return teamInnings?.[0]
    }

    private async getMatchOvers(matchId: number, seriesId: number): Promise<any> {
        this.config.url = Urls.GET_MATCH_DETAILS.replaceAll(":matchId", String(matchId)).replace(":seriesId", String(seriesId))
        this.config.url += `?pagesize=${number}`
        const response = await this.client.sendRequest(this.config)
        let overs = response?.pageCount
        return overs
    }

    private async getDetail(url: string) {
        this.config.url = url
        const response = await this.client.sendRequest(this.config)
        return response
    }

    async getOverDetails(params: Parameters.getOverDetails) {
        try {
            this.params = getOverDetailsSchema.parse(params)
        } catch (error: any) {
            throw error
        }
        const {matchId, seriesId, dataType, overNumber} = params
        this.config.url = Urls.GET_MATCH_DETAILS.replaceAll(":matchId", String(matchId)).replace(":seriesId", String(seriesId))
        this.config.url += `?pagesize=${number}&page=${overNumber}`
        const response = await this.client.sendRequest(this.config)
        let oversDetailItems = response?.items
        let oversDetails = await Promise.all(
            oversDetailItems.map(async (oversDetailItem: any) => await this.getDetail(oversDetailItem["$ref"]) )
        )
        this.overs = oversDetails
        
        if (dataType === "details") return oversDetails
        else if (dataType === "comments"){
            let comments:any = oversDetails.map((oversDetail: any) => {
                return {
                    over: oversDetail?.over,
                    shortText: oversDetail?.shortText,
                    dismissalText: oversDetail?.dismissal?.text
                }
            })
            this.comments = comments
            return comments
        }
    }

    async statsForMatch(params: statsForMatch) {
        try {
            this.params = statsForMatchSchema.parse(params)
        } catch (error: any) {
            throw error
        }
        const {matchId, seriesId, statType} = params
        let statNames:any = {
            batting: ["ballsFaced", "minutes", "runs", "fours", "sixes", "strikeRate"],
            bowling: ['overs', 'maidens', 'conceded', 'wickets', 'economyRate', 'dots', 'foursConceded', 'sixesConceded', 'wides', 'noballs']
        }
        let summaryParams: getMatchSummary = {
            matchId,
            seriesId: seriesId || 0,
            dataType: "rosters",
            innings: 1
        }
        let rosters = await this.getMatchSummary(summaryParams)
        let stats = rosters.map((teamPlayers:any) => {
            let teamStats = teamPlayers?.roster.map((teamPlayer: any) => {
                let athlete:any = {}
                athlete.name = teamPlayer?.athlete?.name
                athlete.playerId = teamPlayer?.athlete?.id
                let lineScores = teamPlayer?.linescores
                let inningsStats = lineScores.map((lineScore: any) => {
                    let playerStats = lineScore?.statistics?.categories?.[0]?.stats
                    let statTypeNames = statNames[statType]
                    let stat = statTypeNames.reduce((acc: any, statName: string) => {
                        acc[statName] = playerStats.filter((stat:any) => stat.name === statName)?.[0]?.value
                        return acc
                    }, {} as any)
                    return stat
                });
                return {athlete, inningsStats}
            })
            return teamStats
        })
        return stats
    }

    async inTeamForMatch(playerId: number, matchId: number) {
        let match = await this.getMatch(matchId)
        let team1 = this.team1Players
        let team2 = this.team2Players
        let foundInTeam1 = team1.find((team1Player: any) => team1Player?.object_id === playerId)
        let foundInTeam2 = team2.find((team2Player: any) => team2Player?.object_id === playerId)
        let foundInTeam = ((foundInTeam1 !== undefined) || (foundInTeam2 !== undefined))
        return foundInTeam
    }
}