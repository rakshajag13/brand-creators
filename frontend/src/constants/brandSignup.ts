export const DOMAINS = [
  {
    domain: "abc.com",
    id: 1,
  },
  {
    domain: "abcd.com",
    id: 2,
  },
  {
    domain: "abcde.com",
    id: 3,
  },
  {
    domain: "test.com",
    id: 4,
  },
  {
    domain: "test1.com",
    id: 5,
  },
];

export const FORM_FIELDS = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", type: "password" },
  { name: "companyName", label: "Company Name" },
  { name: "industry", label: "Industry" },
  { name: "website", label: "Website" },
  { name: "businessType", label: "Business Type" },
  { name: "phone", label: "Phone" },
] as const;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
