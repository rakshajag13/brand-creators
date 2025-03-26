import { PrismaClient } from "@prisma/client";
import {
  AssignGroupUsersGroupType,
  GroupType,
} from "../validators/group.validator";

const prisma = new PrismaClient();
interface groupData {
  name: string;
}
interface groupResponse {
  group: groupData;
}
async function createGroup(data: GroupType): Promise<groupResponse> {
  try {
    const groupDetails = await prisma.group.create({ data });
    return { group: groupDetails };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch groups: " + error.message);
  }
}

async function getAllGroups() {
  try {
    const groups = await prisma.group.findMany();
    if (!groups) {
      throw new Error("Groups not found");
    }
    return groups;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getGroupUsers(groupId: number) {
  try {
    const users = await prisma.userGroup.findMany({ where: { groupId } });
    if (!users) {
      throw new Error("Users not found");
    }
    return { groupId, users: users.map((user) => user.userId) };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function assignUsersToGroup(input: AssignGroupUsersGroupType) {
  try {
    const { groupId, userIds } = input;

    // Validate group existence
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error("Group not found");
    }

    // Validate and assign users to the group
    const userAssignments = userIds.map(async (userId) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return prisma.userGroup.create({
        data: {
          groupId,
          userId,
        },
      });
    });

    await Promise.all(userAssignments);

    return { message: "Users assigned to group successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to assign users to group: " + error.message);
  }
}

async function deleteGroup(groupId: number) {
  try {
    const group = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    return group;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete group " + error.message);
  }
}

export const groupService = {
  createGroup,
  getAllGroups,
  getGroupUsers,
  assignUsersToGroup,
  deleteGroup,
};
