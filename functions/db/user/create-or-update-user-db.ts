import { getDatabase } from "../get-database.ts";
import { tables } from "../tables.ts";
import { UserTelegramType } from "../../lib/telegram/validate-telegram-request.ts";
import { EnvType } from "../../env/env-schema.ts";
import { DatabaseException } from "../database-exception.ts";
import { z } from "zod";

export const userDbSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string().optional(),
  language_code: z.string().optional(),
  username: z.string().optional(),
});

export type UserDbType = z.infer<typeof userDbSchema>;

export const createOrUpdateUserDb = async (
  env: EnvType,
  user: UserTelegramType,
): Promise<UserDbType> => {
  const db = getDatabase(env);

  const { data, error } = await db
    .from(tables.user)
    .upsert({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      language_code: user.languageCode,
      username: user.username,
      last_used: new Date(),
    })
    .select();

  if (error) {
    throw new DatabaseException(error);
  }

  return userDbSchema.parse(data[0]);
};
