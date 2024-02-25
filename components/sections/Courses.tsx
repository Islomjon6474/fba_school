import React from "react";
import { observer } from "mobx-react";
import Button from "../Button";
import Image from "next/image";

type Props = {};
type Course = {
  title: string;
  description: string;
  image: JSX.Element;
  color: string;
};

export const courses = [
  {
    title: "Label",
    description: "234 lessons",
    image: (
      <Image src={`courses/Label.svg`} alt={"Label"} width={50} height={50} />
    ),
    color: "#EBEBFF",
  },

  {
    title: "Business",
    description: "23114 lessons",
    image: (
      <Image
        src={`courses/Business.svg`}
        alt={"Business"}
        width={50}
        height={50}
      />
    ),
    color: "#E1F7E3",
  },

  {
    title: "Finance & Accounting",
    description: "2666634 lessons",
    image: (
      <Image
        src={`courses/Finance.svg`}
        alt={"Finance"}
        width={50}
        height={50}
      />
    ),
    color: "#FFF2E5",
  },

  {
    title: "Marketing",
    description: "234765 lessons",
    image: (
      <Image
        src={`courses/Marketing.svg`}
        alt={"Marketing"}
        width={50}
        height={50}
      />
    ),
    color: "#EBEBFF",
  },
  {
    title: "Music",
    description: "234 lessons",
    image: (
      <Image src={`courses/Music.svg`} alt={"Music"} width={50} height={50} />
    ),
    color: "#FFF2E5",
  },

  {
    title: "IT & Software",
    description: "2342332 lessons",
    image: <Image src={`courses/IT.svg`} alt={"IT"} width={50} height={50} />,
    color: "#FFF0F0",
  },
  {
    title: "Photography & Video",
    description: "234 lessons",
    image: (
      <Image
        src={`courses/Photography.svg`}
        alt={"Photography"}
        width={50}
        height={50}
      />
    ),
    color: "#F5F7FA",
  },
  {
    title: "Health & Fitness",
    description: "2344645 lessons",
    image: (
      <Image src={`courses/Health.svg`} alt={"Health"} width={50} height={50} />
    ),
    color: "#E1F7E3",
  },

  {
    title: "Office Productivity",
    description: "234 lessons",
    image: (
      <Image src={`courses/Office.svg`} alt={"Office"} width={50} height={50} />
    ),
    color: "#F5F7FA",
  },
  {
    title: "Personal Development",
    description: "234 lessons",
    image: (
      <Image
        src={`courses/PersonalDev.svg`}
        alt={"Personal"}
        width={50}
        height={50}
      />
    ),
    color: "#F1F1F2",
  },
  {
    title: "Design",
    description: "234 lessons",
    image: (
      <Image src={`courses/Design.svg`} alt={"Design"} width={50} height={50} />
    ),
    color: "#FFEEE8",
  },

  {
    title: "Lifestyle",
    description: "234 lessons",
    image: (
      <Image
        src={`courses/Lifestyle.svg`}
        alt={"Lifestyle"}
        width={50}
        height={50}
      />
    ),
    color: "#FFF2E5",
  },
];

const CourseCard = ({ course }: { course: Course }) => {
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
};

const Courses: React.FC<Props> = observer(() => {
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
