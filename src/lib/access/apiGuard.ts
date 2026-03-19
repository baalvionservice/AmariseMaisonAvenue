/**
 * @fileOverview Guard for protecting functional actions and API calls.
 */

import { canPerform } from "@/lib/rbac/core";
import { MaisonUser } from "@/lib/rbac/mock-users";
import { logAccessAttempt } from "./logs";
import { Permission } from "@/lib/rbac/permissions";

export interface GuardResponse {
  success: boolean;
  error?: string;
}

export function guardAction(
  user: MaisonUser | null,
  permission: Permission,
  country?: string
): GuardResponse {
  if (!user) {
    logAccessAttempt(null, permission as string, country, "DENIED");
    return { success: false, error: "Authentication required" };
  }

  const isAllowed = canPerform(user, permission, country);
  
  if (!isAllowed) {
    logAccessAttempt(user, permission as string, country, "DENIED");
    return { success: false, error: `Insufficient permissions for: ${permission}` };
  }

  logAccessAttempt(user, permission as string, country, "GRANTED");
  return { success: true };
}
