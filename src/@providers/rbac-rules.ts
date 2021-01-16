export enum Role {
  visitor = "visitor",
  manager = "manager",
  supermanager = "supermanager",
  operator = "operator",
  admin = "admin",
}

const rules = {
  visitor: {
    static: ["auth:login"],
  },
  operator: {
    static: [
      "applications:show",
      "settings:index",
      "users:show",
      "fund:index",
      "fund:faq-index",
      "fund:description-index",
      "fund:description-edit",
      "faq:edit",
    ],
  },
  manager: {
    static: [
      "applications:index",
      "settings:index",
      "application:edit",
      "applications:show",
      "users:show",
      "user:view-applications",
    ],
  },
  supermanager: {
    static: [
      "applications:index",
      "applications:show",
      "application:edit",
      "settings:index",
      "users:show",
      "user:view-applications",
      "fund:description-index",
      "transactions:show",
      "transactions:index",
      "transactions:create",
      "managers:index",
      "fund:index",
      "fund:faq-index",
      "fund:description-index",
    ],
  },
  admin: {
    static: [
      "users:index",
      "users:show",
      "users:create",
      "user:view-sessions",
      "user:show-admin",
      "settings:index",
    ],
  },
};

export function check(role: Role, action: string): boolean {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  return false;
}

export default rules;
