import {
  Prisma,
  // PrismaClient,
  User,
  UserRole,
  UserStatus,
} from "@prisma/client";
import {
  createUser,
  createClientUser,
  createUserByCreatorRole,
  getUserByEmail,
  totalUsersCount,
  getAllUsersContacts,
  updateContactById,
  deleteContact,
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
  clientId?: number;
}
export type SortBy = "firstName" | "lastName" | "email" | "createdAt";
export type SortOrder = "asc" | "desc";
export interface ContactQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  clientId?: number;
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

    await createClientUser({
      userId: user.id,
      clientId: data.clientId,
      role: user.role,
      status: UserStatus.ACTIVE,
    });

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

async function getAllContacts(
  clientId: number,
  params: ContactQueryParams = {}
) {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    if (!clientId) {
      throw new Error("Client ID is required");
    }

    // Build dynamic search condition
    const searchCondition: Prisma.ClientUserWhereInput = {
      clientId,
      ...(search
        ? {
            OR: [
              {
                user: { firstName: { contains: search, mode: "insensitive" } },
              },
              { user: { lastName: { contains: search, mode: "insensitive" } } },
              { user: { email: { contains: search, mode: "insensitive" } } },
              { user: { phone: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
    };

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
        orderBy: [{ [sortBy]: sortOrder }],
        skip,
        take: pageSize,
      }),
    ]);

    // Map the contacts to extract user details
    const formattedContacts = contacts.map((contact) => contact);

    return {
      contacts: formattedContacts,
      pagination: {
        totalContacts,
        currentPage: page,
        pageSize,
        totalPages: Math.ceil(totalContacts / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching contacts by client ID:", error);
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

async function updateContact(
  id: number,
  data: Partial<ContactData>
): Promise<ContactResponse> {
  try {
    const updatedContact = await updateContactById(id, {
      ...data,
    });
    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    return { contact: updatedContact };
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

async function deleteContacts(
  ids: number[]
): Promise<{ deletedCount: number }> {
  try {
    const deletedCount = await Promise.all(
      ids.map(async (id) => {
        const deletedContact = await deleteContact(id);
        if (!deletedContact) {
          throw new Error(`Contact with ID ${id} not found`);
        }
        return deletedContact;
      })
    );

    return { deletedCount: deletedCount.length };
  } catch (error) {
    console.error("Error deleting contacts:", error);
    throw error;
  }
}
export const contactService = {
  createContact,
  getContactByEmail,
  getAllContacts,
  searchContacts,
  updateContact,
  deleteContacts,
};
