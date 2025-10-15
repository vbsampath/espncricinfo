import { z } from "zod"

export const getEventsSchema = z.
    object({
        seriesId: z.number().min(1),
        page: z.number().min(1)
    })
    .strict()

export type getEvents = z.infer<typeof getEventsSchema>