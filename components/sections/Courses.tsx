import React, { useContext, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import Button from "../Button";
import Image from "next/image";
import { CoursesStore, CoursesStoreContex } from "@/stores/courses-store";
import { getAllCourses } from "@/lib/api";
import { Course } from "@/types/courses";
import { useRouter } from "next/router";

type Props = {};

const CourseCard = observer(({ course }: { course: Course }) => {
  const courseStore = useContext(CoursesStoreContex);
  const router = useRouter();

  return (
    <div
      className={`p-4 min-h-[100px] opacity-100 hover:opacity-80 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6 mx-3`}
      style={{ backgroundColor: course.color }}
      onClick={() => {
        router.push(`/courses?id=${course.id}`);
      }}
    >
      <div className={`flex items-start`}>
        {course.image}
        <div className={`px-6 font-inter`}>
          <div className={`font-bold text-base text-[#1D2026] mb-2`}>
            {course.name}
          </div>
          <p className={`text-[#6E7485] text-sm `}>{course.description}</p>
          <p className={` text-sm mt-5 text-black italic font-bold`}>
            Price: {course.price} sum
          </p>
        </div>
      </div>
    </div>
  );
});

const Courses: React.FC<Props> = observer(() => {
  const courseStore = useContext(CoursesStoreContex);

  const { courses } = courseStore;

  useEffect(() => {
    console.log(courses, "courses");
  }, [courses]);

  return (
    <div
      className={`container w-full mt-10 h-fit flex flex-col gap-9 justify-start items-between`}
    >
      <p className={`text-4xl font-bold text-black text-center font-inter `}>
        Browse out courses
      </p>
      <div className={`flex flex-wrap justify-evenly -mx-4`}>
        {Object.values(courses).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
});

export default Courses;
