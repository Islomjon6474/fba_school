import React from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import Button from "@/components/Button";

type Props = {};

const Mission: React.FC<Props> = observer(() => {
  return (
    <div className={`w-full mt-10 h-screen flex `}>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="flex text-black w-4/5 font-inter flex-col items-start gap-16  ">
          <h1 className={`text-6xl font-bold`}>Our Mission</h1>
          <p className={`text-lg`}>
            We are committed to providing the best education to our students
            through our online platform. We believe that everyone should have
            access to quality education, and we are here to make that happen.
          </p>
          <Button variant={`primary`}>Create Account</Button>
        </div>
      </div>
      <div className="w-1/2 h-full relative">
        <img src="mission2.svg" className={`h-full`} alt="mission" />
      </div>
    </div>
  );
});

export default Mission;
