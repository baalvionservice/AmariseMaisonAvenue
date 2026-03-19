'use client';

import { useAppStore } from '@/lib/store';
import { canPerform } from '@/lib/rbac/core';
import { Permission } from '@/lib/rbac/permissions';

/**
 * @fileOverview Frontend hook for access control and UI visibility checks.
 */
export function useRBAC() {
  const { currentUser } = useAppStore();

  return {
    user: currentUser,
    /**
     * Functional permission check.
     * Usage: can('edit_content', 'in')
     */
    can: (permission: Permission, country?: string) => {
      if (!currentUser) return false;
      return canPerform(currentUser, permission, country);
    },
    /**
     * UI Visibility alias for cleaner template logic.
     * Usage: {showIf('control_ai') && <Button />}
     */
    showIf: (permission: Permission, country?: string) => {
      if (!currentUser) return false;
      return canPerform(currentUser, permission, country);
    },
    /**
     * Helper for multi-country UI elements
     */
    isSuperAdmin: currentUser?.role === 'super_admin'
  };
}
