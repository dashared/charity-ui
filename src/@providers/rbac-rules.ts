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
    static: ["applications:show", "settings:index", "users:show"],
  },
  manager: {
    static: [
      "applications:index",
      "settings:index",
      "application:edit",
      "applications:show",
      "users:show",
    ],
  },
  supermanager: {
    static: [
      "applications:index",
      "applications:show",
      "application:edit",
      "settings:index",
      "users:show",
    ],
  },
  admin: {
    static: ["users:index", "settings:index"],
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
