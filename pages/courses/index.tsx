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

const Courses: React.FC = observer(() => {
  const courseStore = useContext(CoursesStoreContex);
  const router = useRouter();

  const [activeKey, setActiveKey] = useState<string>(router.query.id as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      const token = localStorage.getItem("token");
      if (router.query.id && token) {
        const queryId = router.query.id as string;
        runInAction(() => {
          courseStore.currentCourseId = queryId;
          console.log("Current Course ID:", courseStore.currentCourseId);
        });
        setActiveKey(queryId || "1");
        await Promise.all([
          getCourseStructure(queryId, token),
          getCourseInfo(queryId, token),
        ])
          .then(([structureRes, infoRes]) => {
            const { data: structureData } = structureRes;
            const { data: infoData } = infoRes;
            courseStore.courses[queryId] = {
              ...courseStore.courses[queryId],
              ...structureData,
              skills: infoData.skills,
            };
          })
          .catch((error) => {
            console.error("Failed to fetch course data:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };
    fetchData();
  }, [router.query.id, courseStore]);
  const { courses } = courseStore;

  const tabItems = Object.values(courses).map((course: Course) => ({
    label: course.name,
    key: course.id.toString(),
    children: (
      <div
        className={`container flex flex-col items-center justify-center w-[90%] gap-3 p-6 !bg-opacity-50 rounded transition-bg duration-200 ease-in bg-white`}
        // style={{
        //   borderColor: course.color,
        //   backgroundColor: course.color,
        // }}
      >
        <div className={`w-full flex`}>
          <div className={`p-1 flex justify-center items-center`}>
            {course.image}
          </div>
          <div className={`w-full h-full flex justify-between`}>
            <div className=" w-1/2 flex flex-col items-start justify-center">
              <h2 className="text-2xl font-bold">{course.name}</h2>
              <p className="text-lg w-full">{course.description}</p>
            </div>
            <div className=" w-1/2 flex items-center justify-around">
              <p className="text-lg flex flex-col items-start w-fit text-center">
                <span>Modules:</span>
                <span className={`font-bold`}>
                  {course.modules?.length || "0"}
                </span>
              </p>

              <p className="text-lg flex flex-col items-start w-fit text-center">
                <span>Price:</span>
                <span className={`font-bold`}>{course.price} sum</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`w-full flex flex-col gap-3 mt-10 items-start justify-center`}
        >
          <video
            src={`dummy_video2.mp4`}
            controls={true}
            className={`max-h-[90vh]`}
            width={"100%"}
          >
            Something related to the video
          </video>
          <div
            className={`w-full flex flex-col gap-3 my-10 text-xl items-start`}
          >
            <p className={`font-bold`}>Skills:</p>
            {course.skills?.map((skill, index) => {
              return (
                <div key={index} className={` flex gap-2`}>
                  <img src={`ArrowRight.svg`} />
                  <p>{skill}</p>
                </div>
              );
            })}
          </div>
          {course.modules?.map((module: Module, index) => (
            <div
              key={index}
              className={`w-full flex justify-between items-center p-5 opacity-100 hover:opacity-80 rounded-2xl`}
              style={{
                backgroundColor: course.color,
              }}
              onClick={() => {
                if (course.modules?.length) {
                  console.log("Module:", module);
                  router.push(
                    `/modules?${new URLSearchParams({
                      moduleId: module.id.toString(),
                      courseId: course.id.toString(),
                    }).toString()}`,
                    undefined,
                    { shallow: true },
                  );
                }
              }}
            >
              <div className={`flex flex-col items-start`}>
                <p className={`text-lg font-bold`}>{module.name}</p>
                <p className={`text-lg`}>{module.description}</p>
              </div>
              <div className={`flex flex-col items-start`}>
                <p className={`text-lg`}>Topics:</p>
                <p className={`text-lg font-bold`}>
                  {module.topics?.length || "0"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  // Handler for changing tabs, directly manipulating the URL
  const onTabChange = (key: string) => {
    router.push(
      `/courses?${new URLSearchParams({ id: key }).toString()}`,
      undefined,
      { shallow: true },
    );
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
        className={`w-screen min-h-screen !h-fit text-black flex justify-center items-center my-36`}
      >
        {isLoading ? (
          <Spin size={`large`} style={{ color: "orange" }} />
        ) : (
          <Tabs
            className={`w-full h-full !flex-grow`}
            tabPosition="left"
            size="large"
            tabBarStyle={{
              width: "fit-content",
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

export default Courses;
