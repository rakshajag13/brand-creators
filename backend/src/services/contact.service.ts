import {
  Prisma,
  // PrismaClient,
  User,
  UserRole,
  UserStatus,
} from "@prisma/client";
import {
  createUser,
  createClient,
  createUserByCreatorRole,
  getUserByEmail,
  totalUsersCount,
  getAllUsersContacts,
} from "../repositories/userRepository";

//const prisma = new PrismaClient();

interface ContactData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status?: UserStatus;
}

export interface ContactQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "firstName" | "lastName" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}

interface ContactResponse {
  contact: Omit<User, "password">;
}

async function createContact(data: ContactData): Promise<ContactResponse> {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const user = await createUser({
      ...data,
      password: "",
      resetToken: "",
    });

    // If role is CLIENT, create a client record
    if (data.role === "CLIENT") {
      await createClient({
        companyName: "",
        industry: "",
        businessType: "",
        users: { connect: { id: user.id } },
      });
    }

    // If role is CREATOR, create a creator record
    if (data.role === "CREATOR") {
      await createUserByCreatorRole({
        userId: user.id,
        expertise: [],
      });
    }

    return { contact: user };
  } catch (error) {
    throw error;
  }
}

async function getContactByEmail(email: string) {
  try {
    const contact = await getUserByEmail(email);

    if (!contact) {
      throw new Error("Contact not found");
    }

    return { contact: contact || {} };
  } catch (error) {
    throw error;
  }
}

async function getAllContacts(params: ContactQueryParams = {}) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    // Build dynamic search condition
    const searchCondition: Prisma.UserWhereInput = search
      ? {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Pagination calculation
    const skip = (page - 1) * pageSize;

    // Fetch contacts with pagination and filtering
    const [totalContacts, contacts] = await Promise.all([
      totalUsersCount(searchCondition),
      getAllUsersContacts({
        where: searchCondition,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          status: true,
          createdAt: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: pageSize,
      }),
      //prisma.user.count({ where: searchCondition }),
      // prisma.user.findMany(),
    ]);

    return {
      contacts,
      pagination: {
        totalContacts,
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalContacts / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}

async function searchContacts(filters: {
  firstName?: string;
  lastName?: string;
  company?: string;
  minCreatedDate?: Date;
  maxCreatedDate?: Date;
}) {
  try {
    const whereCondition: Prisma.UserWhereInput = {
      ...(filters.firstName && {
        firstName: { contains: filters.firstName, mode: "insensitive" },
      }),
      ...(filters.lastName && {
        lastName: { contains: filters.lastName, mode: "insensitive" },
      }),
      ...(filters.company && {
        company: { contains: filters.company, mode: "insensitive" },
      }),
      ...(filters.minCreatedDate && {
        createdAt: { gte: filters.minCreatedDate },
      }),
      ...(filters.maxCreatedDate && {
        createdAt: { lte: filters.maxCreatedDate },
      }),
    };

    const contacts = await getAllUsersContacts({
      where: whereCondition,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    // prisma.user.findMany({});
    return contacts;
  } catch (error) {
    console.error("Error searching contacts:", error);
    throw error;
  }
}

export const contactService = {
  createContact,
  getContactByEmail,
  getAllContacts,
  searchContacts,
};
