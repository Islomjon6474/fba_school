import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

export const ratings = [
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
export const socialMedia = [
  {
    icon: (
      <Image
        src={`social-media/facebook.svg`}
        alt={"facebook"}
        width={20}
        height={20}
      />
    ),
    href: "/",
  },
  {
    icon: (
      <Image
        src={`social-media/instagram.svg`}
        alt={"instagram"}
        width={20}
        height={20}
      />
    ),
    href: "/",
  },
  {
    icon: (
      <Image
        src={`social-media/linkedin.svg`}
        alt={"linkedin"}
        width={20}
        height={20}
      />
    ),
    href: "/",
  },
  {
    icon: (
      <Image
        src={`social-media/twitter.svg`}
        alt={"twitter"}
        width={20}
        height={20}
      />
    ),
    href: "/",
  },
  {
    icon: (
      <Image
        src={`social-media/youtube.svg`}
        alt={"youtube"}
        width={20}
        height={20}
      />
    ),
    href: "/",
  },
];
export const topCourses = [
  "Label",
  "Business",
  "Finance & Accounting",
  "Marketing",
];
export const quickLinks = ["Home", "Courses", "About", "Contact", "Help"];
const Footer = () => {
  return (
    <footer className="bg-[#1D2026] text-gray-400 font-inter">
      <div className="container mx-auto px-4 py-10">
        <div className="w-4/5 mx-auto lg:w-full flex flex-col lg:flex-row flex-wrap border-b border-[#23262E] py-10 lg:justify-between items-center">
          <div className={`w-full lg:w-1/2 flex flex-col justify-start gap-5`}>
            <h2 className="text-white text-5xl mb-4">
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
        <div className="w-4/5 mx-auto lg:w-full flex flex-col lg:flex-row flex-wrap border-b border-[#23262E] py-10 lg:justify-between items-center">
          <div className={`w-full lg:w-1/2 flex flex-col justify-start gap-5`}>
            <div className={`flex flex-col gap-2`}>
              <div className="text-white flex items-center gap-2 text-2xl break-keep font-bold">
                <img src="/logo-white.svg" alt="logo" className={`w-10 h-10`} />
                FBA-School
              </div>
              <p className="text-[#8C94A3] mb-4">
                Aliquam rhoncus ligula est, non pulvinar elit convallis nec.
                <br />
                Donec mattis odio at.{" "}
              </p>
            </div>
            <div className={`flex gap-2`}>
              {socialMedia.map(({ icon, href }, index) => (
                <Button
                  className={`!font-normal hover:shadow-lg rounded-none !p-3`}
                  variant={`hybrid`}
                >
                  <Link href={href}>{icon}</Link>
                </Button>
              ))}
            </div>
          </div>
          {/* Stats */}
          <div className="w-fit lg:w-1/2 flex justify-evenly items-start text-white mt-10">
            <div className="flex w-fit  flex-col justify-start lg:justify-center">
              <h3 className="text-2xl mb-4 uppercase">Top Courses</h3>
              {topCourses.map((course, index) => (
                <div key={index} className="mr-10">
                  <span className="block text-[#8C94A3] px-2 hover:text-white my-2 transition duration-100 ease-in  border-b-[1px] border-transparent hover:border-[#FF6636]">
                    {course}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex w-fit  flex-col justify-start lg:justify-center">
              <h3 className="text-2xl mb-4 uppercase">Top Courses</h3>
              {quickLinks.map((link, index) => (
                <div key={index} className="mr-10">
                  <span className="block text-[#8C94A3] px-2 hover:text-white my-2 transition duration-100 ease-in  border-b-[1px] border-transparent hover:border-[#FF6636]">
                    {link}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-start items-center mt-10">
          <div className="text-white opacity-50">
            &copy; 2024 E-tutor. Designed by Templatecookie. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
