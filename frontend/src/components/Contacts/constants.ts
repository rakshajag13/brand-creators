export const TABLE_HEADERS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
] as const;

export const DEFAULT_PAGINATION = {
  totalContacts: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
};
