import { z } from "zod"

export const statsForMatchSchema = z.
    object({
        matchId: z.number().min(1),
        seriesId: z.number().min(1),
        statType: z.enum(["batting", "bowling"])
    })
    .strict()

export type statsForMatch = z.infer<typeof statsForMatchSchema>