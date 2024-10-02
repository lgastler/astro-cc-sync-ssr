import { defineCollection, z } from "astro:content";

const TimezoneInfoSchema = z.object({
  utc_offset: z.string(),
  timezone: z.string(),
  day_of_week: z.number(),
  day_of_year: z.number(),
  datetime: z.string(),
  utc_datetime: z.string(),
  unixtime: z.number(),
  raw_offset: z.number(),
  week_number: z.number(),
  dst: z.boolean(),
  abbreviation: z.string(),
  dst_offset: z.number(),
  dst_from: z.string(),
  dst_until: z.string(),
  client_ip: z.string().ip(),
});

const times = defineCollection({
  loader: async () => {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/Europe/Berlin"
    );
    const data = await response.json();
    return [
      {
        id: data.utc_datetime,
        ...data,
      },
    ];
  },
  schema: TimezoneInfoSchema,
});

export const collections = { times };
