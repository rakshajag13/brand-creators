export interface User {
  id: string;
  email: string;
  role: "CLIENT" | "CREATOR";
}
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "CLIENT" | "CREATOR";
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
  clientId: number;
}

export interface ContactData extends Contact {}

export interface ContactResponse {
  user: Omit<User, "password">;
}

export interface AllContactResponse {
  contacts: ContactData[];
  pagination: Pagination;
}

export interface Pagination {
  totalContacts: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}
