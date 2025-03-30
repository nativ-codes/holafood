import i18n, { ModuleType } from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";

import PersistedStorage from "@/config/store/persisted-storage/async-storage";

import resources from "./resources";

const languageDetector = {
  type: "languageDetector" as ModuleType,
  async: true,
  detect: async (callback: (...args: any) => void) => {
    const language = await PersistedStorage.getData("@language", "en");
    callback(language);
  },
};

const changeLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  await PersistedStorage.setData("@language", lang);
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // debug: true,
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
    keySeparator: ".",
  });

export { changeLanguage };
export default i18n;
