const BACKENDS = {
  local: window.localStorage,
  session: window.sessionStorage,
};

type StorageBackend = "local" | "session";

export default class KVStorage {
  private backend: Storage;
  private prefix?: string;

  constructor(type: StorageBackend = "local", prefix?: string) {
    this.backend = BACKENDS[type];
    this.prefix = prefix;
  }

  private prefixedKey(key: string): string {
    const prefix = this.prefix ?? window.APP.name;
    return `${prefix}:${key}`;
  }

  set<T>(key: string, value: T): void {
    const innerKey = this.prefixedKey(key);
    this.backend.setItem(innerKey, JSON.stringify(value));
  }

  get<T>(key: string): T | undefined {
    try {
      const innerKey = this.prefixedKey(key);
      const strValue = this.backend.getItem(innerKey);
      if (strValue) {
        return JSON.parse(strValue) as T;
      }

      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  remove(key: string): void {
    const innerKey = this.prefixedKey(key);
    this.backend.removeItem(innerKey);
  }

  clear(): void {
    this.backend.clear();
  }
}
