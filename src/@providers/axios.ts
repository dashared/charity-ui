import { useEffect, useState } from "react";
import {
  AnalyticsApiFactory,
  AuditApiFactory,
  BatchStatusApiFactory,
  CategoryApiFactory,
  CharityApiFactory,
  ChatApiFactory,
  DonationRequestApiFactory,
  DonationsApiFactory,
  FileApiFactory,
  LoginApiFactory,
  MoneyApiFactory,
  NewsApiFactory,
  NotificationsApiFactory,
  RegistrationApiFactory,
  SettingsApiFactory,
  UserApiFactory,
} from "@generated";
import { AxiosResponse as Response } from "axios";

// i18n reexports
export type { UtilsPageData as PageData } from "@generated";

export const soketUrl = `${
  process.env.NODE_ENV === "production" ? "wss" : "ws"
}://charity.infostrategic.com/api/chat/ws/`;

type AxiosResponse<R> = {
  data: R | undefined;
  loading: boolean;
  error: string | undefined;
  refetchQuery: () => Promise<void>;
};

export default function useAxios<R>(
  // eslint-disable-next-line
  query: (...v: any[]) => Promise<Response<R>>,
  refetch: boolean | undefined = undefined,
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
      console.log(e);
      setError(e?.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [stringifiedUrl, stringifiedInit, refetch]);

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
export const AuditFactory = AuditApiFactory(configuration, basePath, axios);
export const DonationsFactory = DonationsApiFactory(
  configuration,
  basePath,
  axios,
);
export const FileFactory = FileApiFactory(configuration, basePath, axios);
export const BatchStatusFactory = BatchStatusApiFactory(
  configuration,
  basePath,
  axios,
);
export const MoneyFactory = MoneyApiFactory(configuration, basePath, axios);
export const NewsFactory = NewsApiFactory(configuration, basePath, axios);
export const AnalyticsFactory = AnalyticsApiFactory(
  configuration,
  basePath,
  axios,
);
export const ChatsFactory = ChatApiFactory(configuration, basePath, axios);
export const NotificationsFactory = NotificationsApiFactory(
  configuration,
  basePath,
  axios,
);
export const UserRequestFactory = UserApiFactory(
  configuration,
  basePath,
  axios,
);
export const CharityFactory = CharityApiFactory(configuration, basePath, axios);
export const CategoryFactory = CategoryApiFactory(
  configuration,
  basePath,
  axios,
);
export const RegistrationFactory = RegistrationApiFactory(
  configuration,
  basePath,
  axios,
);

export const LoginFactory = LoginApiFactory(configuration, basePath, axios);
export const SettingsFactory = SettingsApiFactory(
  configuration,
  basePath,
  axios,
);

export { UserExtendedUserRoleEnum as UserApiRole } from "@generated";
export type { UserExtendedUser as UserApiModel } from "@generated";
