import { Prisma, PrismaClient } from "@prisma/client";
import { shopType } from "src/validators/shop.validator";

const prisma = new PrismaClient();

interface storeData {
  storeName: string;
  storeUrl: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  clientId: number | null;
  createdAt: Date;
  updateAt: Date;
}

interface shopResponse {
  shop: Omit<storeData, "apiKey" | "apiSecret" | "accessToken">;
}

async function createShopifyStore(data: shopType): Promise<shopResponse> {
  try {
    const input: Prisma.ShopsCreateInput = {
      ...data,
      apiKey: process.env.SHOPIFY_API_KEY || "",
      apiSecret: process.env.SHOPIFY_API_SECRET || "",
      accessToken: process.env.SHOPIFY_API_ACCESS_TOKEN || "",
      createdAt: new Date(),
      updateAt: new Date(),
    };
    const shopDetails = await prisma.shops.create({ data: input });
    return { shop: shopDetails };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllShops(clientId: number) {
  try {
    const shops = await prisma.shops.findMany({
      where: { clientId: { equals: clientId } },
    });
    if (!shops) {
      throw new Error("Shops not found");
    }
    return shops;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllShopsById(shopId: number) {
  try {
    const shop = await prisma.shops.findUnique({ where: { id: shopId } });

    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const shopService = {
  createShopifyStore,
  getAllShops,
  getAllShopsById,
};
