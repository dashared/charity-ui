export type ProgressCallback = (
  this: XMLHttpRequest,
  ev: ProgressEvent<XMLHttpRequestEventTarget>,
) => void;

export type XMLHttpParams = {
  // 0 (or negative) to wait forever
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  method?:
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";
  body?: string | null;
  token?: string | null;
};

export function wrapXMLHttp(
  link: string,
  params: XMLHttpParams,
  onProgress?: ProgressCallback,
): Promise<XMLHttpRequest> {
  const {
    method = "GET",
    body,
    responseType = "blob",
    token,
    timeout = 0,
  } = params;

  return new Promise((resolve) => {
    const req = new XMLHttpRequest();
    req.open(method, link);
    req.responseType = responseType;
    req.timeout = timeout;

    if (token) {
      req.setRequestHeader("authorization", `Bearer ${token}`);
    }
    req.setRequestHeader("content-type", "application/json");

    req.onload = (): void => {
      resolve(req);
    };

    req.onerror = (): void => {
      resolve(req);
    };

    if (onProgress) {
      req.addEventListener("progress", onProgress);
    }

    if (body) {
      req.send(body);
    } else {
      req.send();
    }
  });
}

export function isOk(xhr: XMLHttpRequest): boolean {
  return xhr.status >= 200 && xhr.status < 300;
}
