import React, { useMemo } from "react";
import { observer } from "mobx-react";
import Button from "../Button";
import Image from "next/image";
import { CoursesStore, CoursesStoreContex } from "@/stores/courses-store";

type Props = {};
type Course = {
  title: string;
  description: string;
  image: JSX.Element;
  color: string;
};

const CourseCard = observer(({ course }: { course: Course }) => {
  return (
    <div
      className={`p-4 min-h-[100px] opacity-80 hover:opacity-100 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6 mx-3`}
      style={{ backgroundColor: course.color }}
    >
      <div className={`flex items-start`}>
        {course.image}
        <div className={`px-6 font-inter`}>
          <div className={`font-bold text-base text-[#1D2026] mb-2`}>
            {course.title}
          </div>
          <p className={`text-[#6E7485] text-sm `}>{course.description}</p>
        </div>
      </div>
    </div>
  );
});

const Courses: React.FC<Props> = observer(() => {
  const courseStore = useMemo(() => new CoursesStore(), []);

  const { courses } = courseStore;

  return (
    <div
      className={`container w-full mt-10 h-fit flex flex-col gap-9 justify-start items-between`}
    >
      <p className={`text-4xl font-bold text-black text-center font-inter `}>
        Browse out courses
      </p>
      <div className={`flex flex-wrap justify-evenly -mx-4`}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
});

export default Courses;
