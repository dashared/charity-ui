import { initReactI18next } from "react-i18next";
import i18n, { TFunction } from "i18next";
import detector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const DETECTION_OPTIONS = {
  order: ["navigator"],
};

export const init = (): Promise<TFunction> =>
  i18n
    .use(detector)
    .use(initReactI18next)
    .use(HttpApi)
    .init({
      detection: DETECTION_OPTIONS,
      ns: ["translation", "form", "_error"],
      defaultNS: "translation",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
