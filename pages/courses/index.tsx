import React, { useMemo } from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import Button from "@/components/Button";
import { ConfigProvider, Tabs } from "antd";
import { CoursesStore } from "@/stores/courses-store";

type Props = {};

const Courses: React.FC<Props> = observer(() => {
  const coursesStore = useMemo(() => new CoursesStore(), []);
  const { courses } = coursesStore;
  const tabItems = courses.map((course) => {
    return {
      label: course.title,
      key: course.title,
      children: (
        <div className="flex items-center justify-center">
          {course.image}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="text-lg">{course.description}</p>
          </div>
        </div>
      ),
    };
  });
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
        className={` w-screen h-full text-black flex justify-center items-center my-36`}
      >
        <Tabs className={`w-full`} tabPosition={"left"} items={tabItems} />
      </div>
    </ConfigProvider>
  );
});

export default Courses;
