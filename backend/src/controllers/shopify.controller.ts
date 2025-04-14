import { Request, Response } from "express";
import { shopService } from "../services/shopify.service";
import { shopSchema } from "../validators/shop.validator";

export const createShopifyStore = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }
    const data = shopSchema.parse({
      storeName: req.body.storeName,
      storeUrl: req.body.storeUrl,
      clientId: clientId,
    });
    await shopService.createShopifyStore(data);
    res.status(201).send("shop created successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllShops = async (req: Request, res: Response) => {
  try {
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }

    const result = await shopService.getAllShops(clientId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllShopsById = async (req: Request, res: Response) => {
  try {
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }

    const shopId = Number(req.params.shopId);
    const result = await shopService.getAllShopsById(shopId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteShopById = async (req: Request, res: Response) => {
  try {
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }

    const shopId = Number(req.params.shopId);
    await shopService.deleteShopById(shopId);
    res.status(201).send("shop deleted successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
