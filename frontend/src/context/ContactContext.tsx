import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  User,
  ContactData,
  ContactResponse,
  Contact,
  Pagination
} from "../types/contact";
import { DEFAULT_PAGINATION } from "../components/Contacts/constants";
import { requestHandler } from '../utils/requestHandler';



type GetContactsParams = {
  page: number;
  pageSize: number;
};
interface ContactContextType {
  user: User | null;
  isLoading: boolean;
  contacts: Contact[];
  pagination: Pagination;
  createContact: (
    data: ContactData
  ) => Promise<{ data: User | null; error: string | null }>;
  getContactByEmail: (email: string) => Promise<User | null>;
  getAllContacts: (params: GetContactsParams) => Promise<void>;
  searchContacts: (query: string) => Promise<Contact[]>;
  updateContact: (id: number, data: Contact) => Promise<{ data: User | null; error: string | null }>;
  deleteContacts: (id: number[]) => Promise<void>;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

// export const useContactContext = () => {
//     const context = useContext(ContactContext);
//     if (context === undefined) {
//         throw new Error('useContactContext must be used within a ContactProvider');
//     }
//     return context;
// };

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const createContact = async (data: ContactData) => {
    try {
      setIsLoading(true);
      const res = await requestHandler<ContactResponse>('POST', '/api/contacts', data)

      const contactResponse = res.data;
      setUser(contactResponse.user);

      return {
        data: contactResponse.user,
        error: null,
      };
    } catch (error) {
      console.error("Create contact error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        data: null,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getContactByEmail = async (email: string) => {
    try {
      setIsLoading(true);
      const res = await requestHandler<User>('GET', `/api/contacts/contactsByEmail/${email}`)

      const contactData = res.data;
      return contactData;
    } catch (error) {
      console.error("Get contact by email error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllContacts = useCallback(async (params: GetContactsParams) => {
    const { page, pageSize } = params;

    try {
      const res = await requestHandler<{
        contacts: Contact[];
        pagination: Pagination;
      }>("GET", `/api/contacts?page=${page}&pageSize=${pageSize}`);

      console.log("Fetched contacts:", res.data);
      const { data } = res;
      setContacts(data.contacts);
      setPagination((prev) => ({
        ...prev,
        ...data.pagination,
        currentPage: page,
      }));
    } catch (error) {
      console.error("Get all contacts error:", error);
      throw error;
    }
  }, []);

  const searchContacts = async (query: string) => {
    try {
      setIsLoading(true);
      const res = await requestHandler<Contact[]>('GET', `/api/contacts/search?q=${encodeURIComponent(
        query
      )}`)

      return res.data;
    } catch (error) {
      console.error("Search contacts error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateContact = useCallback(async (id: number, data: Contact) => {
    try {
      setIsLoading(true);
      const res = await requestHandler<ContactResponse>('PATCH', `/api/contacts/${id}`, data);

      const contactResponse = res.data;
      setUser(contactResponse.user);

      return {
        data: contactResponse.user,
        error: null,
      };
    } catch (error) {
      console.error("Update contact error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        data: null,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteContacts = async (ids: number[]) => {
    try {
      setIsLoading(true);
      await requestHandler<ContactResponse>('DELETE', `/api/contacts`, { ids })
    } catch (error) {
      console.error("Delete contacts error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllContacts({ page: 1, pageSize: 10 });
  }, [getAllContacts]);





  return (
    <ContactContext.Provider
      value={{
        user,
        isLoading,
        contacts,
        pagination,
        createContact,
        getAllContacts,
        getContactByEmail,
        searchContacts,
        updateContact,
        deleteContacts,
        setPagination
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context)
    throw new Error("useContact must be used within an ContactProvider");
  return context;
};

