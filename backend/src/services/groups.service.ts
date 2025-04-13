import { PrismaClient } from "@prisma/client";
import {
  AssignGroupUsersGroupType,
  GroupType,
} from "../validators/group.validator";

const prisma = new PrismaClient();
interface groupData {
  name: string;
  description: string | null;
  clientId: number;
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

async function getGroupUsers(groupId: number, clientId: number) {
  try {
    const users = await prisma.userGroup.findMany({
      where: { groupId, clientId },
    });
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
    const { groupId, userIds, clientId } = input;

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
          clientId,
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

async function updateGroup(
  groupId: number,
  data: { name: string; description: string | null },
  clientId: number
) {
  try {
    const group = await prisma.group.update({
      where: { id: groupId, clientId: clientId },
      data,
    });
    return group;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update group: " + error.message);
  }
}

async function deleteGroup(groupIds: number[], clientId: number) {
  try {
    // Delete associated user groups first
    await prisma.userGroup.deleteMany({
      where: {
        groupId: { in: groupIds },
        clientId,
      },
    });

    // Delete the groups
    const deletedGroups = await prisma.group.deleteMany({
      where: {
        id: { in: groupIds },
        clientId,
      },
    });

    if (deletedGroups.count === 0) {
      throw new Error("No groups found to delete");
    }

    return { message: `${deletedGroups.count} group(s) deleted successfully` };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete groups: " + error.message);
  }
}

export const groupService = {
  createGroup,
  getAllGroups,
  getGroupUsers,
  assignUsersToGroup,
  updateGroup,
  deleteGroup,
};
