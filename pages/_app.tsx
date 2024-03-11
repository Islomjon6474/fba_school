import type { AppProps } from "next/app";
import "../styles/global.css";
import {
  CoursesStore,
  CoursesStoreContex,
  getRandomImageAndColor,
} from "@/stores/courses-store";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { getAllCourses, getCourseInfo } from "@/lib/api";
import { runInAction } from "mobx";
import { Spin } from "antd";

const pagesWithoutLayout: string[] = ["/auth/login", "/auth/register"];

const pagesLoginNeeded: string[] = ["/courses"];

export default function App({ Component, pageProps, router }: AppProps) {
  const courseStore = useMemo(() => new CoursesStore(), []);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (pagesLoginNeeded.includes(router.pathname) && !token) {
      router.push("/auth/login");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      setLoading(true);
      getAllCourses(token)
        .then((res) => {
          const { data } = res;
          console.log("Courses:", data);
          for (const course of data) {
            runInAction(async () => {
              const randomImageAndColor = getRandomImageAndColor();
              console.log("Random Image and Color:", randomImageAndColor);
              courseStore.courses[course.id] = {
                ...course,
                ...randomImageAndColor,
              };

              console.log("Courses:", courseStore.courses);
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <CoursesStoreContex.Provider value={courseStore}>
      {loading ? (
        <div className={`w-screen h-screen flex justify-center items-center`}>
          <Spin size={`large`} />
        </div>
      ) : pagesWithoutLayout.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </CoursesStoreContex.Provider>
  );
}
