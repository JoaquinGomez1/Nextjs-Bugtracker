import { useEffect, useState } from "react";

export default function useFetch(URL, HEADERS) {
  const [data, setData] = useState();
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = async () => {
    const URL = process.env.BACKEND_URL + "/user";
    const req = HEADERS ? await fetch(URL, HEADERS) : await fetch(URL);
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
