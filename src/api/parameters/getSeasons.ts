import { z } from "zod"

export const getSeasonsSchema = z.
    object({
        seriesId: z.number().min(1),
        page: z.number().min(1)
    })
    .strict()

export type getSeasons = z.infer<typeof getSeasonsSchema>