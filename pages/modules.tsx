import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ConfigProvider, Spin, Tabs } from "antd";
import {
  CoursesStoreContex, // Assuming correction
} from "@/stores/courses-store";
import { Course, Module } from "@/types/courses";
import { useRouter } from "next/router";
import { getCourseInfo, getCourseStructure } from "@/lib/api";
import { runInAction } from "mobx";

const Modules: React.FC = observer(() => {
  const courseStore = useContext(CoursesStoreContex);
  const router = useRouter();
  const { courses, currentCourseId } = courseStore;

  const [activeKey, setActiveKey] = useState<string>(
    router.query.moduleId as string,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(courses, "courses");
  }, []);

  useEffect(() => {
    console.log(courses, "courses");
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (router.query.moduleId && router.query.courseId && token) {
        console.log(router.query.moduleId, "queryId", router.query.moduleId);
        setActiveKey((router.query.moduleId as string) || "1");
        await Promise.all([
          getCourseStructure(router.query.courseId! as string, token),
        ])
          .then(([structureRes]) => {
            const { data: structureData } = structureRes;
            console.log();
            courseStore.courses[router.query.courseId as string] = {
              ...courseStore.courses[router.query.courseId as string],
              modules: structureData.modules,
            };
          })
          .catch((error) => {
            console.error("Failed to fetch course data:", error);
          })
          .finally(() => {
            if (courseStore.courses[router.query.courseId as string].modules) {
              setIsLoading(false);
            }
          });
      }
    };
    fetchData();
  }, [router.query.moduleId && router.query.courseId]);

  const tabItems = courses[
    (router.query.courseId as string) || "1"
  ]?.modules?.map((module: Module) => {
    console.log(module, "module in the map");
    console.log(
      module.id.toString(),
      activeKey,
      module.id.toString() === activeKey,
    );
    return {
      label: module.name,
      key: module.id.toString(),
      children: (
        <div className={`w-[90%] h-full flex flex-col gap-10 items-between`}>
          <div className={`flex w-full`}>
            <div className=" w-1/2 flex flex-col items-start justify-center">
              <h2 className="text-2xl font-bold">{module.name}</h2>
              <p className="text-lg w-full">{module.description}</p>
            </div>
            <div className=" w-1/2 flex items-center justify-around">
              <p className="text-lg flex flex-col items-start w-fit text-center">
                <span>Topics:</span>
                <span className={`font-bold`}>
                  {module.topics?.length || "0"}
                </span>
              </p>
            </div>
          </div>
          <div className={`w-full flex flex-col gap-3`}>
            {module.topics?.map((topic, index) => (
              <div
                key={index}
                className={`w-full flex justify-between items-center p-3 bg-gray-200 opacity-100 hover:opacity-80 rounded-2xl`}
                onClick={() => {
                  router.push(
                    `/topic?${new URLSearchParams({
                      moduleId: module.id.toString(),
                      courseId: router.query.courseId!.toString(),
                      topicId: topic.id!.toString(),
                    }).toString()}`,
                    undefined,
                    { shallow: true },
                  );
                }}
              >
                <div className={`flex flex-col items-start`}>
                  <p className={`text-lg font-bold`}>{topic.name}</p>
                  <p className={`text-lg`}>{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  });

  // Handler for changing tabs, directly manipulating the URL
  const onTabChange = (key: string) => {
    setActiveKey(key);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, moduleId: key },
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemSelectedColor: `#FF6636`,
            inkBarColor: `#FF6636`,
            itemHoverColor: `#FF6636`,
            itemActiveColor: `#FF6636`,
          },
        },
      }}
    >
      <div
        className={`w-screen min-h-screen !h-screen text-black flex justify-center items-center my-36`}
      >
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Tabs
            className={`w-full h-full !flex-grow`}
            tabPosition="left"
            size="large"
            tabBarStyle={{
              width: "fit-content",
              maxWidth: "30%",
              minWidth: "15%",
              height: "100%",
            }}
            items={tabItems}
            animated={true}
            activeKey={activeKey}
            onChange={onTabChange}
          />
        )}
      </div>
    </ConfigProvider>
  );
});

export default Modules;
