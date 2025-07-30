import { z } from "zod";

const appEnvSchema = z.object({
  apiUrl: z.string(),
});

export const appEnv = appEnvSchema.parse({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
});
