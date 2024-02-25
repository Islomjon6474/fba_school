import React from "react";
import { observer } from "mobx-react";
type InstructorProps = {
  name: string;
  title: string;
  rating: number;
  studentsCount: number;
  imageUrl: string;
  description: string[];
};

export const Instructor: React.FC<InstructorProps> = observer(
  ({ name, title, rating, studentsCount, imageUrl, description }) => {
    return (
      <div className="flex !h-2/5 flex-col md:flex-row bg-[#EEAA17] rounded-xl shadow-lg overflow-hidden">
        {/* Description Section */}
        <div className="p-8 flex flex-col justify-evenly bg-orange-100 w-full md:w-1/2">
          <div className={`flex flex-col`}>
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <h3 className="text-xl mb-4">{title}</h3>
          </div>
          <div className="flex flex-col gap-4">
            {description.map((desc, index) => (
              <p>{desc}</p>
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-orange-600 text-sm font-semibold mr-2">{`${studentsCount.toLocaleString()} students`}</span>
          </div>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex flex-col items-end !justify-end w-full md:w-1/2">
          <img src={imageUrl} alt={`${name}`} className="w-full h-full" />
        </div>
      </div>
    );
  },
);

const Instructors: React.FC = observer(() => {
  const instructorData = {
    name: "Devon Lane",
    title: "Senior Developer",
    rating: 4.6,
    studentsCount: 854,
    imageUrl: "Instructor.svg",
    description: [
      "Devon Lane is a seasoned Senior Developer with a robust track record\n" +
        "        spanning over a decade in the tech industry. His expertise is broad and\n" +
        "        deep, encompassing modern frontend frameworks, backend services, and\n" +
        "        full-stack applications. Devon's journey began in the trenches of\n" +
        "        startup culture, where agility and versatility were not just buzzwords,\n" +
        "        but daily realities.",
      "From there, he transitioned to working with\n" +
        "        multinational corporations, contributing to large-scale software\n" +
        "        solutions that drive business and innovation. Devon's passion for coding\n" +
        "        is matched only by his enthusiasm for sharing knowledge. As a mentor, he\n" +
        "        has guided hundreds of students through the complexities of coding,\n" +
        "        helping them to unravel the intricacies of software development and\n" +
        "        emerge as confident, competent professionals. ",
    ],
  };

  return (
    <div
      className={`container min-h-screen h-fit w-full my-10 flex flex-col justify-center items-center text-black font-inter`}
    >
      <p
        className={`text-4xl font-bold mb-10 mt-20 text-black text-center font-inter `}
      >
        Top instructors
      </p>
      <Instructor {...instructorData} />
    </div>
  );
});

export default Instructors;
