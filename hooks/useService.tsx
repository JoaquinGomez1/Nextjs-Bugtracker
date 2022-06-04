import { useState } from "react";
import { HttpServiceResponse } from "../services";

/**
 * Takes an http service function and returns am array that exposes the service response
 *  and a function to fetch the data on demand
 *
 * @generic T The type of the data returned by the service
 * @generic P The type of the parameter passed to the service
 *
 * @param httpService The http service function
 * @returns [data, callService] where data is the response from the service stored in state and callService is a function to call the service
 * */
export function useServiceState<T, P = {}>(
  httpService: (param: P) => HttpServiceResponse<T>
) {
  const [data, setData] = useState<T>();

  const callService = async (param: P) => {
    const { res } = await httpService(param);
    setData(res);
  };

  return [data, callService];
}
