import { CreateContactModal } from "../components/CreateContactModal";
export interface User {
  id: string;
  email: string;
  role: "CLIENT" | "CREATOR";
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "CLIENT" | "CREATOR";
}

export interface CreateContact {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "CLIENT" | "CREATOR";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token?: string;
}
