import { MaisonUser } from "../rbac/mock-users";

/**
 * @fileOverview Internal logging for the Security Validation Layer.
 */

export function logAccess(
  user: MaisonUser | null,
  permission: string,
  country: string,
  status: "GRANTED" | "DENIED"
) {
  const userName = user?.name || "Anonymous";
  const userRole = user?.role || "NONE";

  console.log(
    `%c[SECURITY] %cStatus: ${status} %c| User: ${userName} (${userRole}) | Perm: ${permission} | Region: ${country}`,
    "color: #D4AF37; font-weight: bold;",
    status === "GRANTED" ? "color: #10b981;" : "color: #ef4444;",
    "color: #6b7280;"
  );
}
