import defaultHeaders from "../headers";

type ServiceResponse<T> = { req: Response; res: T };
export type HttpServiceResponse<T> = Promise<ServiceResponse<T>>;

/**Base http service type*/
export type HttpService = <T>(
  url: string,
  headers?: RequestInit
) => HttpServiceResponse<T>;

const DEFAULT_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

/**Makes an http request injecting this app's default header and base url*/
export const httpService: HttpService = async <T>(
  url: string,
  headers?: RequestInit
) => {
  const req = await fetch(DEFAULT_URL + url, {
    ...headers,
    ...defaultHeaders,
  });
  const res: T = await req.json();
  return { req, res };
};
