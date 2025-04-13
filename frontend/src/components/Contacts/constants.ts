export const TABLE_HEADERS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "group", label: "Group" },
] as const;

export const TABLE_HEADERS_GROUPS = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
] as const;

export const DEFAULT_PAGINATION = {
  totalContacts: 0,
  pageSize: 10,
  currentPage: 1,
  totalPages: 0,
};
