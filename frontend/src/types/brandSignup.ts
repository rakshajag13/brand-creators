export interface BrandSignupData {
  email: string;
  password: string;
  companyName: string;
  industry: string;
  website: string;
  businessType: string;
  phone?: string;
  domain: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";
}
