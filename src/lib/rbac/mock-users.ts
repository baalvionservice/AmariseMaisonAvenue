import { Role, ROLES } from "../roles/system";

/**
 * @fileOverview Mock user registry for RBAC testing.
 * Formalized for 1 Super Admin and 5 Hub-specific Country Admins.
 */

export interface MaisonUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  country: string; // "GLOBAL" or a specific CountryCode ('us', 'uk', 'ae', 'in', 'sg')
}

export const users: MaisonUser[] = [
  {
    id: "u-super",
    name: "Julian Vandervilt",
    email: "julian@amarise-luxe.com",
    role: ROLES.SUPER_ADMIN,
    country: "GLOBAL",
  },
  {
    id: "u-admin-us",
    name: "Hub Lead (USA)",
    email: "admin.us@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "us",
  },
  {
    id: "u-admin-uk",
    name: "Hub Lead (UK)",
    email: "admin.uk@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "uk",
  },
  {
    id: "u-admin-ae",
    name: "Hub Lead (UAE)",
    email: "admin.ae@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "ae",
  },
  {
    id: "u-admin-in",
    name: "Hub Lead (India)",
    email: "admin.in@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "in",
  },
  {
    id: "u-admin-sg",
    name: "Hub Lead (Singapore)",
    email: "admin.sg@amarise-luxe.com",
    role: ROLES.COUNTRY_ADMIN,
    country: "sg",
  },
  {
    id: "u-op-us",
    name: "US Registry Operator",
    email: "ops.us@amarise-luxe.com",
    role: ROLES.OPERATOR,
    country: "us",
  },
];
