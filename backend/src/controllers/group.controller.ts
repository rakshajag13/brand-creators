import { Request, Response } from "express";
import { groupService } from "../services/groups.service";
import {
  AssignGroupUsersSchema,
  GroupSchema,
} from "../validators/group.validator";

export const createGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const input = GroupSchema.parse({ name: req.body.name });
    const details = await groupService.createGroup(input);
    res.status(201).send({
      details,
      message: "group created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getAllGroups = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getGroupUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId = Number(req.params.groupId);
    const users = await groupService.getGroupUsers(groupId);
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const assignUsersToGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId = Number(req.params.groupId);
    const { userIds } = req.body;
    const input = AssignGroupUsersSchema.parse({ userIds, groupId });
    const result = await groupService.assignUsersToGroup(input);
    res.status(201).send({
      result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const deleteGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId = Number(req.params.groupId);
    let result = await groupService.deleteGroup(groupId);
    res.status(201).send({ result, message: "group deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
