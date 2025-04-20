// src/core/hooks/useLocalInfo.ts

export const useLocalInfo = () => {
    return {
      userRole: 'admin',            // 'admin', 'user', 'guest' etc.
      page: 'dashboard',           // fx 'dashboard', 'settings', 'auth/login'
      mode: 'view',                // 'view', 'edit', 'create'
      context: 'organization',     // fx 'organization', 'task', 'billing'
    }
  }
  