import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FlagGB from "./icons/gb.svg";
import FlagRU from "./icons/ru.svg";
import FlagUZ from "./icons/uz.svg";
import LangIcon from "./icons/language-icon.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLocale, setLocale } from "react-i18nify";
import { twJoin } from "tailwind-merge";

export type Lang = "en" | "ru" | "uz";

export interface Locale {
  value: Lang;
  code: () => JSX.Element;
  text: string;
}

export const locales: Record<Lang, Locale> = {
  uz: {
    value: "uz",
    text: "O'zbek",
    code: () => <FlagUZ />,
  },
  ru: {
    value: "ru",
    text: "Русский",
    code: () => <FlagRU />,
  },
  en: {
    value: "en",
    text: "English",
    code: () => <FlagGB />,
  },
};

export default function LanguageSelector() {
  const router = useRouter();

  // Use TypeScript to define the state type
  const [locale, setLocale] = useState<string | undefined>();
  const [selectedLocale, setSelectedLocale] = useState<Locale | undefined>(
    undefined,
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    let storedLocale =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    let initialLocale: string =
      storedLocale || router.locale?.split("-")[0] || "uz";

    const localeObj: Locale = locales[initialLocale as Lang] || locales.uz; // Default to "uz" or another default if not found
    setLocale(initialLocale);
    setSelectedLocale(localeObj);
  }, [router.locale]);

  const reloadForUpdateContent = () => {
    router.push(router.pathname, router.pathname, {
      locale: selectedLocale?.value,
    });
  };

  useEffect(() => {
    if (selectedLocale) {
      setOpen(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", selectedLocale.value);
      }
      reloadForUpdateContent();
    }
  }, [selectedLocale]);

  if (!selectedLocale) {
    return null; // Or a loader, or any placeholder
  }

  return (
    <div
      className="relative text-white select-none"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-2 px-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <LangIcon />
        <span className="hidden xl:block">{selectedLocale.text}</span>
        <span className="block uppercase xl:hidden">
          {selectedLocale.value}
        </span>
        <ChevronDownIcon
          className={twJoin(
            "h-5 w-5 transition-transform duration-[350ms]",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="absolute z-50 transition-opacity duration-500 top-full animate-fadeIn">
          <div className="relative flex flex-col p-1 mt-3 border bg-secondary border-one-dark rounded-xl">
            {Object.values(locales).map(({ value, text, code: Flag }) => (
              <div
                key={value}
                onClick={() => setSelectedLocale({ value, text, code: Flag })}
                className="flex items-center gap-2 p-2 pl-3  rounded-lg cursor-pointer hover:bg-white/10"
              >
                <Flag />
                <span className="hidden xl:block">{text}</span>
                <span className="block uppercase xl:hidden">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
