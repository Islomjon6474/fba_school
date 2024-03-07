import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import { t } from "react-i18nify";

const baseURL = "http://localhost:8081/client";

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
);

// TODO implement error handling logic
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;
//
//     if (error.message === "canceled") {
//       return;
//     }
//
//     if (!response) {
//       toast.error(t("errors.noInternet"));
//     }
//
//     // check if the error is from /account -> then ignore it
//     // if (
//     //     response &&
//     //     !response.config.url.includes("/account") &&
//     //     !response.config.url.includes("/pricing")
//     // ) {
//     //     const error = Object.values(response.data || {})[0] || response.data;
//     //     if (
//     //         response.status !== 401 &&
//     //         response.status !== 409 &&
//     //         response.status !== 400
//     //     ) {
//     //         SweetAlert.fire(t("errorOccurred"), t("errors.retryAgain"), "error");
//     //     }
//     // }
//
//     return Promise.reject(error);
//   },
// );

export const login = async (username: string, password: string) => {
  console.log(baseURL, "baseURL");
  const response = await api.post("/auth/sign-in", {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post("/auth/sign-up", {
    username,
    password,
  });
  return response.data;
};

export const getAllCourses = async () => {
  const response = await api.get("/course/get-all");
  return response.data;
};

export const getCourseInfo = async (courseId: string) => {
  const response = await api.get(`/course/get-full-info/${courseId}`);
  return response.data;
};

export const getCourseStructure = async (courseId: string) => {
  const response = await api.get(
    `/module/get-all/for-user?courseId=${courseId}`,
  );
  return response.data;
};
