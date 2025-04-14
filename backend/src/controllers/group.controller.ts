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
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }
    const input = GroupSchema.parse({
      name: req.body.name,
      description: req.body.description,
      clientId: clientId,
    });
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
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }
    const groupId = Number(req.params.groupId);
    const users = await groupService.getGroupUsers(groupId, clientId);
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
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }

    const groupId = Number(req.params.groupId);
    const { userIds } = req.body;
    const input = AssignGroupUsersSchema.parse({ userIds, groupId, clientId });
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

export const updateGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId = Number(req.params.groupId);
    const { user } = req as any;
    const clientId = user?.client?.id;

    if (!clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }
    const input = GroupSchema.parse({
      name: req.body.name,
      description: req.body.description,
    });
    const updatedGroup = await groupService.updateGroup(
      groupId,
      input,
      clientId
    );
    res.status(200).json({
      updatedGroup,
      message: "Group updated successfully",
    });
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const deleteGroup = async (
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

    const groupIds = req.query.groupIds as string | undefined;

    if (!groupIds) {
      res
        .status(400)
        .json({ error: "Bad Request: groupIds query parameter is missing" });
      return;
    }

    const idsArray = groupIds.split(",").map((id) => Number(id));

    if (idsArray.some(isNaN)) {
      res.status(400).json({
        error:
          "Bad Request: groupIds must be a comma-separated list of numbers",
      });
      return;
    }

    const result = await groupService.deleteGroup(idsArray, clientId);
    res.status(200).send({ result, message: "Group(s) deleted successfully" });
  } catch (error) {
    const statusCode = error instanceof Error ? 400 : 500;
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(statusCode).json({ error: errorMessage });
  }
};
