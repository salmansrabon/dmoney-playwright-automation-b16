export enum Role {
  Admin = "Admin",
  Customer = "Customer",
  Agent = "Agent",
  Merchant = "Merchant",
}

export interface Person{
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    nid: string;
    role?: Role
}