import { z } from "zod"

export const getOverDetailsSchema = z.
    object({
        matchId: z.number().min(1),
        seriesId: z.number().min(1),
        dataType: z.enum(["details", "comments"]),
        overNumber: z.number().min(1)
    })
    .strict()

export type getOverDetails = z.infer<typeof getOverDetailsSchema>