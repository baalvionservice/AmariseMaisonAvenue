/**
 * @fileOverview High-level guard for protecting page views and routes.
 */

import { canPerform } from "@/lib/rbac/core";
import { MaisonUser } from "@/lib/rbac/mock-users";
import { logAccessAttempt } from "./logs";
import { Permission } from "@/lib/rbac/permissions";

export function guardPage(
  user: MaisonUser | null,
  permission: Permission,
  country?: string
): boolean {
  if (!user) {
    logAccessAttempt(null, permission as string, country, "DENIED");
    return false;
  }

  const isAllowed = canPerform(user, permission, country);
  const status = isAllowed ? "GRANTED" : "DENIED";
  
  logAccessAttempt(user, permission as string, country, status);
  
  return isAllowed;
}
