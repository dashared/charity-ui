import { initReactI18next } from "react-i18next";
import i18n, { TFunction } from "i18next";
import HttpApi from "i18next-http-backend";

export const init = (): Promise<TFunction> =>
  i18n
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      ns: ["common", "form", "_error"],
      defaultNS: "common",
      lng: "ru",
      fallbackLng: "ru",
      interpolation: {
        escapeValue: false,
      },
    });
