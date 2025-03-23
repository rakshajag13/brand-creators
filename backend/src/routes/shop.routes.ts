import { Router } from "express";
import * as shopController from "../controllers/shopify.controller";

const router = Router();

router.post("/", shopController.createShopifyStore);
router.get("/:clientId", shopController.getAllShops);
router.get("/:clientId/:shopId", shopController.getAllShopsById);

export default router;
