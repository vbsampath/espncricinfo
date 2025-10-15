export const Urls = {
    GET_SUMMARY: "http://static.cricinfo.com/rss/livescores.xml",
    GET_MATCH: "http://www.cricinfo.com/ci/engine/match/:matchId.json",
    GET_MATCH_DETAILS: "http://core.espnuk.org/v2/sports/cricket/leagues/:seriesId/events/:matchId/competitions/:matchId/details",
    GET_MATCH_SUMMARY: "https://site.api.espn.com/apis/site/v2/sports/cricket/:seriesId/summary?event=:matchId",
    GET_PLAYER_DETAILS: "http://core.espnuk.org/v2/sports/cricket/athletes/:playerId",
    GET_PLAYER_STATS: "http://new.core.espnuk.org/v2/sports/cricket/athletes/:playerId/statistics",
    GET_SERIES_DETAILS: "http://core.espnuk.org/v2/sports/cricket/leagues/:seriesId/",
    GET_EVENTS_DETAILS: `http://core.espnuk.org/v2/sports/cricket/leagues/:seriesId/events`,
    GET_SEASONS_DETAILS: `http://core.espnuk.org/v2/sports/cricket/leagues/:seriesId/seasons`,
}
