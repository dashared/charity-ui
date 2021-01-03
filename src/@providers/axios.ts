import { useEffect, useState } from "react";
import { DonationRequestApiFactory, UserApiFactory } from "@generated";
import { AxiosResponse as Response } from "axios";

// i18n reexports
export type { ModelsPageData as PageData } from "@generated";

type AxiosResponse<R> = {
  data: R | undefined;
  loading: boolean;
  error: string | undefined;
  refetchQuery: () => Promise<void>;
};

export default function useAxios<R>(
  // eslint-disable-next-line
  query: (...v: any[]) => Promise<Response<R>>,
  // eslint-disable-next-line
  ...variables: any[]
): AxiosResponse<R> {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // Turn objects into strings for useCallback & useEffect dependencies
  const [stringifiedUrl, stringifiedInit] = [
    JSON.stringify(variables),
    JSON.stringify(query),
  ];

  const fetchData = async (): Promise<void> => {
    try {
      const response = await query(...variables);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error(`Error ${response.status} ${response.statusText}`);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [stringifiedUrl, stringifiedInit]);

  if (!(data || error)) {
    return { data, loading: true, error, refetchQuery: fetchData };
  }

  return { data, loading: false, error, refetchQuery: fetchData };
}

const configuration = undefined;
const basePath = undefined;
const axios = undefined;

export const DonationRequestFactory = DonationRequestApiFactory(
  configuration,
  basePath,
  axios,
);
export const UserRequestFactory = UserApiFactory(
  configuration,
  basePath,
  axios,
);
