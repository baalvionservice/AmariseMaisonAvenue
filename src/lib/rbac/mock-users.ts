import { Role, ROLES } from "./roles";

/**
 * @fileOverview Mock user registry for RBAC testing.
 */

export interface MaisonUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  country: string; // "GLOBAL" or a specific CountryCode
}

export const users: MaisonUser[] = [
  {
    id: "u-1",
    name: "Julian Vandervilt (Super)",
    email: "julian@amarise-luxe.com",
    role: ROLES.SUPER_ADMIN,
    country: "GLOBAL",
  },
  {
    id: "u-2",
    name: "Aditi Sharma (India Admin)",
    email: "aditi@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "in",
  },
  {
    id: "u-3",
    name: "John Smith (Operator)",
    email: "john@amarise-luxe.com",
    role: ROLES.OPERATOR,
    country: "us",
  },
  {
    id: "u-4",
    name: "Lumière Atelier (Vendor)",
    email: "contact@lumiere.com",
    role: ROLES.VENDOR,
    country: "ae",
  },
];
