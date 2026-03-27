import { rolePermissions } from "./rolePermissions";
import { MaisonUser } from "../rbac/mock-users";
import { Permission } from "./engine";

/**
 * @fileOverview Refined core logic for permission validation and real-time access control.
 */

/**
 * Validates if a user can perform a specific action, considering role and geography.
 */
export function canPerform(user: MaisonUser | null, permission: string, resourceCountry?: string): boolean {
  if (!user) return false;

  const perms = rolePermissions[user.role] || [];
  
  // 1. Check functional permission (Super Admin or wildcard override)
  if (perms.includes("*")) return true;
  
  if (perms.includes(permission as Permission)) {
    // 2. Check geographic jurisdiction
    if (user.role === "super_admin" || user.country === "GLOBAL") {
      return true;
    }
    // Regional admins/operators are strictly isolated to their country code
    return !resourceCountry || user.country.toLowerCase() === resourceCountry.toLowerCase();
  }

  return false;
}
