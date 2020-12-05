import KVStorage from "./kvstorage";

const JWT_TOKEN = "jwtToken";
const PERM = "permissions";

const storage = new KVStorage("local");

export type Permission = string;
export type Permissions = Array<Permission>;
export type AuthToken = string;

export function getPermissions(): Permissions {
  return storage.get(PERM) || [];
}

export function setPermissions(permissions: Permissions): void {
  storage.set(PERM, permissions);
}

export function clearPermissions(): void {
  storage.set(PERM, []);
}

export function getToken(): AuthToken | undefined {
  return storage.get<AuthToken>(JWT_TOKEN);
}

export function setToken(token: AuthToken): void {
  storage.set(JWT_TOKEN, token);
}

export function checkPermissions(
  permissions: Permissions | Permission,
  against?: Permissions,
): boolean {
  if (!permissions) {
    return true;
  }
  const access = against || getPermissions();

  if (Array.isArray(permissions)) {
    return permissions.every((p) => access.includes(p));
  }

  return access.includes(permissions);
}
