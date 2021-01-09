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
    static: ["applications:index", "application:view", "settings:index",],
  },
  manager: {
    static: ["applications:index", "settings:index", "application:edit", "application:view"],
  },
  supermanager: {
    static: ["applications:index", "application:view", "application:edit", "settings:index"],
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
