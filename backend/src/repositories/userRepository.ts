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

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
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

export const createClientUser = async (data: any) => {
  return prisma.clientUser.create({
    data,
  });
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
  searchCondition: Prisma.ClientUserWhereInput
) => {
  return prisma.clientUser.count({
    where: searchCondition,
  });
};

export const updateContactById = async (id: number, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
export const deleteContact = async (id: number) => {
  return await prisma.$transaction([
    prisma.creator.deleteMany({
      where: { userId: id },
    }),
    prisma.userGroup.deleteMany({
      where: { userId: id },
    }),
    prisma.clientUser.deleteMany({
      where: { userId: id },
    }),
    prisma.session.deleteMany({
      where: { userId: id },
    }),

    prisma.user.delete({
      where: { id },
    }),
  ]);
};
