import { z } from "zod";

export const GroupSchema = z.object({
  name: z.string(),
});

export const AssignGroupUsersSchema = z.object({
  userIds: z.array(z.number()),
  groupId: z.number(),
});

export type AssignGroupUsersGroupType = z.infer<typeof AssignGroupUsersSchema>;
export type GroupType = z.infer<typeof GroupSchema>;
