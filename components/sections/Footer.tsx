import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

const Footer = () => {
  const ratings = [
    {
      rate: 67.1,
      title: "Students",
    },
    {
      rate: 63.1,
      title: "Courses",
    },
    {
      rate: 26,
      title: "Instructors",
    },
    {
      rate: 99.9,
      title: "Success rate",
    },
  ];

  return (
    <footer className="bg-[#1D2026] text-gray-400 font-inter">
      <div className="container mx-auto px-4 py-10">
        <div className="w-4/5 mx-auto lg:w-full flex flex-col lg:flex-row flex-wrap border-b border-[#23262E] py-10 lg:justify-between items-center">
          <div className={`w-full lg:w-1/2 flex flex-col justify-start gap-5`}>
            <h2 className="text-white text-5xl font-bold mb-4">
              Start learning with 67.1k <br /> students around the world.
            </h2>
            <div className={`flex gap-2`}>
              <Button className={`!font-normal`} variant={`primary`}>
                Join our team
              </Button>
              <Button className={`!font-normal`} variant={`dark`}>
                All courses
              </Button>
            </div>
          </div>
          {/* Stats */}
          <div className="w-full lg:w-1/2 text-white mt-10">
            <div className="flex justify-start lg:justify-center">
              {ratings.map((rating, index) => (
                <div key={index} className="mr-10">
                  <span className="block text-2xl font-bold">
                    {rating.rate}k
                  </span>
                  <span className={`text-[#B7BAC7]`}>{rating.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center mt-10">
          <div className="text-white">
            &copy; 2024 E-tutor. Designed by Templatecookie. All rights
            reserved.
          </div>
          <div>
            {/* Language Selector, as a placeholder */}
            <select className="bg-black text-white">
              <option value="english">English</option>
              {/* Add more language options here */}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
