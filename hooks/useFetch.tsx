import { useEffect, useState } from "react";
import headers, { IHeaders } from "../headers";

const DEFAULT_URL = process.env.BACKEND_URL + "/user";

export default function useFetch<T>(
  URL: string = DEFAULT_URL,
  HEADERS = headers
) {
  const [data, setData] = useState<T>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const req = HEADERS
      ? await fetch(URL, HEADERS as RequestInit)
      : await fetch(URL);
    const res = await req.json();
    setDataLoading(false);
    setData(res);
  };

  useEffect(() => {
    let isComponentMounted = true;
    isComponentMounted && fetchData();

    return () => {
      isComponentMounted = false;
    };
  }, []);

  return { data, setData, dataLoading, setDataLoading };
}
