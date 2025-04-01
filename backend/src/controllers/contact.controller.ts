import { Request, Response } from "express";
import { contactService } from "../services/contact.service";

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
    const { page, pageSize, search, sortBy, sortOrder } = req.query;
    const result = await contactService.getAllContacts({
      page: page ? parseInt(page as string) : undefined,
      pageSize: pageSize ? parseInt(pageSize as string) : undefined,
      search: search as string,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
    });
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
    console.log("Updated contact id:", id);
    const contact = await contactService.updateContact(
      parseInt(id as string),
      req.body
    );
    console.log("Updated contact:", contact);
    res.status(200).json(contact);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
// export async function deleteContact(req: Request, res: Response) {
//   try {
//     const { id } = req.params;
//     await contactService.deleteContact(parseInt(id as string));
//     res.status(204).send();
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

export const contactController = {
  CreateContact,
  GetContactByEmail,
  GetAllContacts,
  SearchContacts,
  UpdateContact,
  //s deleteContact,
};
