import type { AppProps } from "next/app";
import "../styles/global.css";
import { CoursesStore, CoursesStoreContex } from "@/stores/courses-store";
import { useEffect, useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";

const pagesWithoutLayout: string[] = ["/auth/login", "/auth/register"];

const pagesLoginNeeded: string[] = ["/courses"];

export default function App({ Component, pageProps, router }: AppProps) {
  const courseStore = useMemo(() => new CoursesStore(), []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (pagesLoginNeeded.includes(router.pathname) && !token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <CoursesStoreContex.Provider value={courseStore}>
      {pagesWithoutLayout.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </CoursesStoreContex.Provider>
  );
}
