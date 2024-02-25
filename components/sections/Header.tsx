import React from "react";
import { observer } from "mobx-react";
import LanguageSelector from "@/components/LanguageSelector";
import Link from "next/link";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Button from "@/components/Button";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

type Props = {};

const Header: React.FC<Props> = observer(() => {
  const [currentTab, setCurrentTab] = React.useState("home");

  const headerList = [
    {
      title: "Home",
      value: "home",
      href: "/",
    },
    {
      title: "Courses",
      value: "courses",
      href: "/courses",
    },
    {
      title: "About",
      value: "about",
      href: "/about",
    },
    {
      title: "Contact",
      value: "contact",
      href: "/contact",
    },
  ];

  return (
    <div className={`fixed top-0 left-0 z-[1000000] w-full flex flex-col`}>
      <div className={`w-full h-fit bg-[#1D2026]`}>
        <div className={`container w-full flex justify-between`}>
          <div className={`flex items-center`}>
            {/*  Map through the headerList and show the results*/}
            <div className={`flex items-center gap-2 mx-2`}>
              {headerList.map(({ title, value, href }, index) => (
                <p
                  key={index}
                  // href={href}
                  onClick={() => setCurrentTab(value)}
                  className={`text-[#8C94A3] text-sm font-inter tracking-[-1%]  px-4 py-2`}
                  style={{
                    borderTop:
                      currentTab === value
                        ? "2px solid #FF6636"
                        : "2px solid transparent",
                  }}
                >
                  {title}
                </p>
              ))}
            </div>
            {/*<LanguageSelector />*/}
          </div>
        </div>
      </div>
      <div className={`w-full h-fit bg-white border-b border-[#D9D9D9]`}>
        <div className={`container w-full  flex justify-between`}>
          <div className={`flex items-center gap-2 py-4`}>
            <img src="/logo.svg" alt="logo" className={`w-10 h-10 bg-white`} />
            <Search
              placeholder="What would you like to learn?"
              className={`w-1/2 rounded-none`}
              onSearch={onSearch}
              style={{ width: 300 }}
            />
            {/*<LanguageSelector />*/}
          </div>
          <div className={`flex items-center gap-2 py-4`}>
            <Button
              variant="outline"
              className="text-white"
              onClick={() => console.log("clicked")}
            >
              Login
            </Button>
            <Button
              variant="primary"
              className="text-white"
              onClick={() => console.log("clicked")}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Header;
