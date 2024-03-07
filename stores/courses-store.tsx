import React from "react";
import { io } from "socket.io-client";
import moment from "moment";
import { toast } from "react-toastify";
import * as r from "ramda";
import camelcaseKeys from "camelcase-keys";
import axios, { CancelTokenSource } from "axios";
import { t } from "react-i18nify";
import { getAllCourses, getCourseInfo, getCourseStructure } from "@/lib/api";

import { action, makeAutoObservable, reaction, runInAction, toJS } from "mobx";
import snakecaseKeys from "snakecase-keys";
import { v4 } from "uuid";
import { assertDefined } from "@/utils";
import Image from "next/image";

export class CoursesStore {
  courses = [
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
        <Image
          src={`courses/Health.svg`}
          alt={"Health"}
          width={50}
          height={50}
        />
      ),
      color: "#E1F7E3",
    },

    {
      title: "Office Productivity",
      description: "234 lessons",
      image: (
        <Image
          src={`courses/Office.svg`}
          alt={"Office"}
          width={50}
          height={50}
        />
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
        <Image
          src={`courses/Design.svg`}
          alt={"Design"}
          width={50}
          height={50}
        />
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
  isLoading = false;
  error: {} | null = null;
  cancelTokenSource: CancelTokenSource | null = null;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.courses,
      () => {
        console.log("Courses changed", toJS(this.courses));
      },
    );
  }

  fetchCourses = async () => {
    this.isLoading = true;
    this.error = null;
    this.cancelTokenSource = axios.CancelToken.source();

    try {
      const { data } = await getAllCourses();
      runInAction(() => {
        this.courses = camelcaseKeys(data);
      });
    } catch (error) {
      if (!axios.isCancel(error)) {
        runInAction(() => {
          assertDefined(error);
          this.error = error;
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  cancelFetch = () => {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel();
    }
  };
}
export const CoursesStoreContex = React.createContext<CoursesStore>(null!);

export const useVideoStore = () => {
  return React.useContext(CoursesStoreContex)!;
};
