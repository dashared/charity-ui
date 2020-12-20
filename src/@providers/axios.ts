import { useState, useEffect } from "react";
import { DefaultApi } from "@generated";
import axios, { AxiosResponse as Response } from "axios";

const axiosInstance = axios.create();

type AxiosResponse<R> = {
  data: R | undefined;
  loading: boolean;
  error: string | undefined;
}

export default function useAxios<R>(query: (...v: any[]) => Promise<Response<R>>, ...variables: any[]): AxiosResponse<R> {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    query(variables).then((r) => {
      setData(r.data);
    }).catch((e) => {
      setError(e.message);
    })
    // eslint-disable-next-line
  }, []);

  if (!(data || error)) {
    return { data, loading: true, error }
  }

  return { data, loading: false, error };
}

/** Service to perform donations requests */
export const donationService = new DefaultApi(undefined, undefined, axiosInstance);
