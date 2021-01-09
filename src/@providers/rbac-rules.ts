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
    static: ["applications:list", "application:view"],
  },
  manager: {
    static: ["applications:list", "application:view", "application:edit"],
  },
  supermanager: {
    static: ["applications:list", "application:view", "application:edit"],
  },
  admin: {
    static: ["users:list"],
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
