import { z } from "zod";

export const shopSchema = z.object({
  storeName: z.string(),
  storeUrl: z.string(),
  clientId: z.number().default(1),
});

export type shopType = {
  storeName: string;
  storeUrl: string;
  clientId: number;
};
