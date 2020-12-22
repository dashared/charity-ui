import { useState, useEffect } from "react";
import { DefaultApi } from "@generated";
import axios, { AxiosResponse as Response } from "axios";

// i18n reexports
export type { ModelsPageData as PageData } from "@generated";

const axiosInstance = axios.create();

type AxiosResponse<R> = {
  data: R | undefined;
  loading: boolean;
  error: string | undefined;
}

export default function useAxios<R>(query: (...v: any[]) => Promise<Response<R>>, ...variables: any[]): AxiosResponse<R> {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // Turn objects into strings for useCallback & useEffect dependencies
  const [stringifiedUrl, stringifiedInit] = [JSON.stringify(variables), JSON.stringify(query)];

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await query(...variables);

        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [stringifiedUrl, stringifiedInit]);

  if (!(data || error)) {
    return { data, loading: true, error }
  }

  return { data, loading: false, error };
}

/** Service to perform donations requests */
export const donationService = new DefaultApi(undefined, undefined, axiosInstance);
