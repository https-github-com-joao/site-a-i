export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HttpMethod = "post" | "get" | "put" | "delete" | "POST" | "GET" | "PUT" | "DELETE";

export type HttpResponse<T = any> = {
  body?: T;
};
