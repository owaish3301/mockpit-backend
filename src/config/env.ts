import { config } from "dotenv";
import z from "zod";
import ConfigurationError from "../lib/errors/ConfigError.js";

config();

const envSchema = z.object({
  DATABASE_URL: z
    .string({ error: "Provide database url" })
    .min(1, { error: "Database url is empty" }),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

function getEnv(env: keyof Env) {
  if (cachedEnv) {
    return cachedEnv[env];
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new ConfigurationError({ errorMessage: parsed.error.message });
  }
  cachedEnv = parsed.data;
  return cachedEnv[env];
}

export default getEnv;
