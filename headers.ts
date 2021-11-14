export interface IHeaders {
  headers: HeadersInit;
  credentials: string;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

const headers: IHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default headers;
