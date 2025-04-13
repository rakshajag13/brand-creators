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
  group: {
    name: string;
    id: number;
  };
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

export interface Group {
  id: number;
  name: string;
  description: string;
  clientId: number;
}

export interface GroupData extends Group {}
export interface GroupResponse {
  group: GroupData;
}
export interface AllGroupResponse {
  groups: GroupData[];
}
