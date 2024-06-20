export const AUTH_PATHS = {
  login: "/auth/login",
  resetPassword: "/auth/reset-password",
  confirmEmail: "auth/confirm-email",
  twoFALogin: "auth/2fa-login",
};

export const DASHBOARD_PATHS = {
  index: "/",
  userManagement: "/user-management",
  cashOutRequest: "/cash-out-request",
  transactions: "/transactions",
  settings: "/settings",
  activityLogs: "/activity-logs",
};

export const pageMeta = {
  overview: {
    title: "Overview",
    description:
      "Track, manage and forecast your Pilgrims, Agents and Transactions.",
  },
  userManagement: {
    title: "User Management",
    description: "Manage and oversee user accounts with ease.",
  },
  transactions: {
    title: "Transactions",
    description: "Manage and oversee all users transactions",
  },
  settings: {
    title: "Settings",
    description: "Manage and oversee all users transactions",
  },
  activityLogs: {
    title: "Activity Logs",
    description: "Effortlessly track and manage administrative activities.",
  },
};
