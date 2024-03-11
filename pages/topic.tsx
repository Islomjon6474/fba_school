import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { ConfigProvider, Spin, Tabs } from "antd";
import {
  CoursesStoreContex, // Assuming correction
} from "@/stores/courses-store";
import { Course, Module, Topic } from "@/types/courses";
import { useRouter } from "next/router";
import { getCourseInfo, getCourseStructure } from "@/lib/api";
import { runInAction } from "mobx";

const Topic: React.FC = observer(() => {
  const courseStore = useContext(CoursesStoreContex);
  const router = useRouter();
  const { courses, currentCourseId } = courseStore;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>(
    router.query.topicId as string,
  );
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const currentModuleRef = useRef<Module | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (
        router.query.moduleId &&
        router.query.courseId &&
        router.query.topicId &&
        token
      ) {
        setActiveKey((router.query.topicId as string) || "1");
        await Promise.all([
          getCourseStructure(router.query.courseId! as string, token),
          getCourseInfo(router.query.courseId! as string, token),
        ])
          .then(([structureRes, infoRes]) => {
            const { data: structureData } = structureRes;
            const { data: infoData } = infoRes;
            courseStore.courses[router.query.courseId as string] = {
              ...courseStore.courses[router.query.courseId as string],
              modules: structureData.modules,
              skills: infoData.skills,
            };
            const currentModule = structureData.modules.find(
              (module: Module) => module.id == router.query.moduleId,
            );
            console.log(
              currentModule,
              "currentModuleeeee",
              structureData.modules,
            );
            setCurrentModule(currentModule);
          })
          .catch((error) => {
            console.error("Failed to fetch course data:", error);
          })
          .finally(() => {
            if (courseStore.courses[router.query.courseId as string].modules) {
              setIsLoading(false);
              console.log(
                currentModule,
                "currentModule",
                currentModuleRef.current,
              );
            }
          });
      }
    };
    fetchData();
  }, [router.query.moduleId && router.query.courseId && router.query.topicId]);

  const tabItems = currentModule?.topics?.map((topic: Topic) => {
    console.log(module, "module in the map");
    console.log(
      topic.id.toString(),
      activeKey,
      topic.id.toString() === activeKey,
    );
    return {
      label: topic.name,
      key: topic.id.toString(),
      children: (
        <div
          className={`w-[90%] h-full overflow-auto flex flex-col gap-10 items-center`}
        >
          <div className={`flex w-[80%] items-start flex-col`}>
            <h1 className={`text-3xl mb-10 font-bold`}>{topic.name}</h1>
            <video
              src={`dummy_video2.mp4`}
              controls={true}
              className={`max-h-full`}
              width={"100%"}
              height={"100%"}
            >
              Something related to the video
            </video>
            <div className={`mt-10 text-xl`}>
              <p className={`font-bold`}>Description:</p>
              <p className={` italic`}>{topic.description}</p>
            </div>
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
      query: {
        courseId: router.query.courseId,
        moduleId: router.query.moduleId,
        topicId: key,
      },
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
            className={`w-screen h-full !flex-grow`}
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

export default Topic;
