import { Router } from "express";
import * as groupController from "../controllers/group.controller";

const router = Router();

router.post("/", groupController.createGroup);
router.get("/", groupController.getAllGroups);
router.get("/:groupId/users", groupController.getGroupUsers);
router.post("/:groupId/users", groupController.assignUsersToGroup);
router.delete("/:groupId", groupController.deleteGroup);

export default router;
