import { RecordItem } from "../../../types/types";

type HTTPMethod = (url: string, options?: any) => Promise<unknown>;

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const defaultHeaders = {
  "Content-type": "application/json; charset=UTF-8",
};

function queryStringify(data = {} as RecordItem) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`,
    "?"
  );
}

class Client {
  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET }, options!.timeout);

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST }, options!.timeout);

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT }, options!.timeout);

  delete: HTTPMethod = (url, options = {}) =>
    this.request(
      url,
      {
        ...options,
        method: METHODS.DELETE,
      },
      options!.timeout
    );

  request = (url: string, options: any, timeout = 10000) => {
    let { headers = {}, method, data } = options;

    if (Object.keys(headers).length == 0 && !(data instanceof FormData)) {
      headers = defaultHeaders;
    }

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new window.XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.withCredentials = true;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        let resp: any = "";

        if (xhr.response === "OK") {
          resp = { status: "OK" };
        } else {
          resp = JSON.parse(xhr.response);
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(resp);
        } else {
          reject(resp);
        }

        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default new Client();
