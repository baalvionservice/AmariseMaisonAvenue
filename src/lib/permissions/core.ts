import { rolePermissions } from "./rolePermissions";
import { MaisonUser } from "../rbac/mock-users";
import { logAccess } from "../logs/accessLogs";
import { Permission } from "./engine";

/**
 * @fileOverview Core logic for permission validation and real-time access control.
 */

/**
 * Validates if a user can perform a specific action, considering role and geography.
 */
export function canPerform(user: MaisonUser | null, permission: string, resourceCountry?: string): boolean {
  if (!user) {
    logAccess(null, permission, resourceCountry || "GLOBAL", "DENIED");
    return false;
  }

  const perms = rolePermissions[user.role] || [];
  let granted = false;

  // 1. Check functional permission
  if (perms.includes("*")) {
    granted = true;
  } else if (perms.includes(permission as Permission)) {
    // 2. Check geographic jurisdiction
    if (user.role === "super_admin" || user.country === "GLOBAL") {
      granted = true;
    } else {
      // Regional admins/operators are strictly isolated to their country code
      granted = !resourceCountry || user.country.toLowerCase() === resourceCountry.toLowerCase();
    }
  }

  logAccess(user, permission, resourceCountry || "GLOBAL", granted ? "GRANTED" : "DENIED");
  
  return granted;
}
