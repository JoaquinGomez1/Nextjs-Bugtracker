import { useEffect, useState } from "react";
import defaultHeaders from "../headers";

const DEFAULT_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
interface FetchOptions {
  headers?: typeof defaultHeaders;
  useInitialFetch?: boolean;
}

const defaultOptions: FetchOptions = {
  useInitialFetch: true,
};

export default function useFetch<T>(
  URL: string = DEFAULT_URL,
  { useInitialFetch }: FetchOptions = defaultOptions
) {
  const [data, setData] = useState<T>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const FINAL_URL = process.env.NEXT_PUBLIC_BACKEND_URL + URL;

  const fetchData = async (options?: RequestInit) => {
    const reqHeaders = { ...options, ...defaultHeaders }; // Takes the request options and appends the default headers
    const req = await fetch(FINAL_URL, reqHeaders);

    const res: T = await req.json();
    return { req, res };
  };

  const setDataHandler = async () => {
    const { res } = await fetchData();
    setData(res);
    setDataLoading(false);
  };

  useEffect(() => {
    let isComponentMounted = true;
    isComponentMounted && useInitialFetch && setDataHandler();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  return { data, setData, dataLoading, fetchData, setDataHandler };
}
