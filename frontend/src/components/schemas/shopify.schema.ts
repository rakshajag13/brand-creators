import { z } from "zod";

export const shopifySchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeShopifyUrl: z
    .string()
    .refine(
      (url) => url.includes("myshopify.com"),
      "Please provide valid shopify store url"
    ),
});
