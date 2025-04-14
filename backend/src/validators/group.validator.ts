import { z } from "zod";

export const GroupSchema = z.object({
  name: z.string(),
  description: z.string(),
  clientId: z.number(),
});

export const AssignGroupUsersSchema = z.object({
  userIds: z.array(z.number()),
  groupId: z.number(),
  clientId: z.number(),
});

export type AssignGroupUsersGroupType = z.infer<typeof AssignGroupUsersSchema>;
export type GroupType = z.infer<typeof GroupSchema>;
