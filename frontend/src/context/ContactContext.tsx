import React, { createContext, useCallback, useContext, useState } from "react";

import {
  User,
  ContactData,
  ContactResponse,
  AllContactResponse,
} from "../types/contact";

type GetContactsParams = {
  page: number;
  pageSize: number;
};
interface ContactContextType {
  user: User | null;
  isLoading: boolean;
  createContact: (
    data: ContactData
  ) => Promise<{ data: User | null; error: string | null }>;
  getContactByEmail: (email: string) => Promise<User | null>;
  getAllContacts: (params: GetContactsParams) => Promise<AllContactResponse>;
  searchContacts: (query: string) => Promise<User[]>;
  // updateContact: (id: string, data: Partial<User>) => Promise<void>;
  // deleteContact: (id: string) => Promise<void>;
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

  const createContact = async (data: ContactData) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:4000/api/contact/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization token if needed
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData.error);

        return {
          error: errorData.error || "Failed to create contact",
          data: null,
        };
      }

      const contactResponse: ContactResponse = await res.json();
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
      const res = await fetch(
        `http://localhost:4000/api/contact/contactsByEmail/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization token if needed
            // "Authorization": `Bearer ${token}`
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch contact");
      }

      const contactData: User = await res.json();
      return contactData;
    } catch (error) {
      console.error("Get contact by email error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllContacts = useCallback(
    async ({
      page,
      pageSize,
    }: GetContactsParams): Promise<AllContactResponse> => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `http://localhost:4000/api/contact/contacts?page=${page}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }

        return await res.json();
      } catch (error) {
        console.error("Get all contacts error:", error);
        throw error;
      }
    },
    []
  );

  const searchContacts = async (query: string) => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/contact/contacts/search?q=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to search contacts");
      }

      return await res.json();
    } catch (error) {
      console.error("Search contacts error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // const updateContact = async (id: string, data: Partial<User>) => {
  //     try {
  //         setIsLoading(true);
  //         const res = await fetch(`http://localhost:4000/api/contacts/${id}`, {
  //             method: "PATCH",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 // Add authorization token if needed
  //                 // "Authorization": `Bearer ${token}`
  //             },
  //             body: JSON.stringify(data)
  //         });

  //         if (!res.ok) {
  //             throw new Error("Failed to update contact");
  //         }
  //     } catch (error) {
  //         console.error("Update contact error:", error);
  //         throw error;
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };

  // const deleteContact = async (id: string) => {
  //     try {
  //         setIsLoading(true);
  //         const res = await fetch(`http://localhost:4000/api/contacts/${id}`, {
  //             method: "DELETE",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 // Add authorization token if needed
  //                 // "Authorization": `Bearer ${token}`
  //             }
  //         });

  //         if (!res.ok) {
  //             throw new Error("Failed to delete contact");
  //         }
  //     } catch (error) {
  //         console.error("Delete contact error:", error);
  //         throw error;
  //     } finally {
  //         setIsLoading(false);
  //     }
  // };

  return (
    <ContactContext.Provider
      value={{
        user,
        isLoading,
        createContact,
        getContactByEmail,
        getAllContacts,
        searchContacts,
        // updateContact,
        // deleteContact
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
