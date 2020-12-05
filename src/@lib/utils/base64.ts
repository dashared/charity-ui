export function encode(str: string): string | undefined {
  try {
    return window.btoa(encodeURIComponent(str));
  } catch (e) {
    return;
  }
}

export function decode(str: string): string | undefined {
  try {
    return decodeURIComponent(window.atob(str));
  } catch (e) {
    return;
  }
}
