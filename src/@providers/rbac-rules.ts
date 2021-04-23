export enum Role {
  visitor = "visitor",
  manager = "manager",
  supermanager = "supermanager",
  operator = "operator",
  admin = "admin",
}

const rules = {
  visitor: {
    static: ["auth:login", "faq:pretty", "news:public"],
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
      "news:edit",
      "news:create",
      "news:index",
    ],
  },
  manager: {
    static: [
      "applications:index",
      "settings:index",
      "application:edit",
      "applications:show",
      "applications:create",
      "users:show",
      "user:view-applications",
    ],
  },
  supermanager: {
    static: [
      "applications:index",
      "applications:show",
      "application:edit",
      "applications:create",
      "settings:index",
      "categories:index",
      "users:show",
      "user:view-applications",
      "fund:description-index",
      "transactions:show",
      "transactions:index",
      "transactions:create",
      "managers:index",
      "managers:show",
      "fund:index",
      "fund:faq-index",
      "fund:description-index",
    ],
  },
  admin: {
    static: [
      "users:index",
      "users:show",
      "user:edit",
      "users:create",
      "user:view-sessions",
      "user:show-admin",
      "settings:index",
      "logs:index",
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
