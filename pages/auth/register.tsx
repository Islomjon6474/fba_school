import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ConfigProvider, Input, InputRef, Typography } from "antd";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import { assertDefined } from "@/utils";
import { login, register } from "@/lib/api";

const Register = observer(() => {
  const usernameRef = React.useRef<InputRef>(null);
  const passwordRef = React.useRef<InputRef>(null);
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBorderColor: `#FFDDD1`,
            activeBorderColor: `#FF6636`,
            activeShadow: `0 0 0 2px #FFDDD1`,
          },
        },
      }}
    >
      <div
        className={`w-screen font-inter overflow-y-hidden h-screen flex justify-center items-center text-black`}
      >
        <div
          className={`w-full hidden lg:flex flex-col items-center justify-center`}
        >
          <img
            className={`object-fill !w-full !h-full !max-h-full bg-no-repeat`}
            src="/register.svg"
            alt="register"
          />
        </div>
        <div className={`w-full flex flex-col items-center justify-center`}>
          <div
            className={`w-4/5 flex flex-col items-center justify-center gap-5`}
          >
            <p
              className={`text-4xl font-bold text-black text-center font-inter `}
            >
              Register
            </p>
            <div className={`w-1/2`}>
              <Typography.Title className={`w-full font-normal !m-0`} level={5}>
                Username
              </Typography.Title>
              <Input
                ref={usernameRef}
                className={`w-full`}
                onChange={(e) => {
                  console.log("Username:", e.target.value);
                }}
                placeholder="input username"
              />
            </div>
            <div className={`w-1/2`}>
              <Typography.Title className={`w-full font-normal !m-0`} level={5}>
                Password
              </Typography.Title>
              <Input.Password
                ref={passwordRef}
                className={`w-full`}
                onChange={(e) => {
                  console.log("Password:", e.target.value);
                }}
                placeholder="input password"
              />
            </div>
            <Button
              onClick={() => {
                assertDefined(usernameRef.current?.input?.value);
                assertDefined(passwordRef.current?.input?.value);
                register(
                  usernameRef.current?.input?.value,
                  passwordRef.current?.input?.value,
                ).then((response) => {
                  const { data } = response;
                  setToken(data.token);
                });
              }}
              variant="primary"
              className={`w-1/2 h-fit`}
            >
              Register
            </Button>
            <div className={`flex gap-1`}>
              <span> {"Do you have an account? "}</span>
              <Link
                className={`text-text_color opacity-50 hover:opacity-100`}
                href="/auth/login"
              >
                {" Login here"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
});

export default Register;
