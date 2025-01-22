import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllUsersContacts = async (condition: any) => {
  return prisma.user.findMany(condition);
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: any) => {
  return prisma.user.create({
    data,
  });
};

export const createClient = async (data: any) => {
  return prisma.client.create(data);
};

export const createSession = async (data: any) => {
  return prisma.session.create({
    data,
  });
};

export const createUserByCreatorRole = async (data: any) => {
  return prisma.creator.create({
    data,
  });
};

export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const getFirstUserMatchByFilter = async (resetToken: string) => {
  return prisma.user.findFirst({
    where: { resetToken },
  });
};

export const totalUsersCount = async (
  searchCondition: Prisma.UserWhereInput
) => {
  return prisma.user.count({
    where: searchCondition,
  });
};
