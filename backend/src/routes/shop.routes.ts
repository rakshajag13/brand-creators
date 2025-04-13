import { Router } from "express";
import * as shopController from "../controllers/shopify.controller";

const router = Router();

router.post("/", shopController.createShopifyStore);
router.get("/", shopController.getAllShops);
router.get("/:shopId", shopController.getAllShopsById);
router.delete("/:shopId", shopController.deleteShopById);

export default router;
