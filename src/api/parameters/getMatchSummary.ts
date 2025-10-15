import { z } from "zod"

export const getMatchSummarySchema = z.
    object({
        matchId: z.number().min(1),
        seriesId: z.number().min(1),
        dataType: z.enum(["summary", "fow", "rosters", "venue"]),
        innings: z.number().min(1).max(4).optional() // assuming max 4 innings in a match are possible
    })
    .strict()

export type getMatchSummary = z.infer<typeof getMatchSummarySchema>