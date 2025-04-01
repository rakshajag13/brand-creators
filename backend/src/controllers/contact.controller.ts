import { Request, Response } from "express";
import {
  ContactQueryParams,
  contactService,
  SortBy,
  SortOrder,
} from "../services/contact.service";

export async function CreateContact(req: Request, res: Response) {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function GetContactByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const contact = await contactService.getContactByEmail(email);
    res.status(201).json(contact);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function GetAllContacts(req: Request, res: Response) {
  try {
    console.log("req.query", req);
    const { page, pageSize, search, sortBy, sortOrder } = req.query;
    // Extracting user information from the request
    // Assuming you have a middleware that adds user info to the request
    // For example, if you're using passport.js, you can access user info like this:
    // const { user } = req as any;
    // If you're using a different authentication method, adjust accordingly
    // const user = req.user;
    const { user } = req as any;
    console.log("user---contacts", user);
    // Check if user is authenticated and has clientId
    if (!user || !user.clientId) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found or clientId is missing" });
      return;
    }
    const obj: ContactQueryParams = {
      page: page ? parseInt(page as string) : undefined,
      pageSize: pageSize ? parseInt(pageSize as string) : undefined,
      search: search as string,
      sortBy: sortBy as SortBy,
      sortOrder: sortOrder as SortOrder,
    };
    const result = await contactService.getAllContacts(user.clientId, obj);

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function SearchContacts(req: Request, res: Response) {
  try {
    const { firstName, lastName, company, minCreatedDate, maxCreatedDate } =
      req.query;

    const result = await contactService.searchContacts({
      firstName: firstName as string,
      lastName: lastName as string,
      company: company as string,
      minCreatedDate: minCreatedDate
        ? new Date(minCreatedDate as string)
        : undefined,
      maxCreatedDate: maxCreatedDate
        ? new Date(maxCreatedDate as string)
        : undefined,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function UpdateContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const contact = await contactService.updateContact(
      parseInt(id as string),
      req.body
    );

    res.status(200).json(contact);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export async function DeleteContact(req: Request, res: Response) {
  try {
    const { ids } = req.body;
    await contactService.deleteContacts(ids as number[]);
    res.status(200).json({
      success: true,
      message: "Contacts deleted successfully",
      deletedCount: ids.length,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const contactController = {
  CreateContact,
  GetContactByEmail,
  GetAllContacts,
  SearchContacts,
  UpdateContact,
  DeleteContact,
};
