import { ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { AxiosError } from "axios";
import * as Yup from "yup";

const userRequestBody = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username Must be at least 3 characters")
    .max(20, "Username Too Long")
    .required(),
  password: Yup.string()
    .min(8, "Password Must be at least 8 characters")
    .required(),
});

interface UserRequestBody {
  username: string;
  password: string;
}

export const register = async (user: UserRequestBody) => {
  try {
    const userValidate = await userRequestBody.validate(user);

    const res = await AppAxios.post<ResponseJson<{}>>(
      "/auth/register",
      userValidate
    );

    return res.data;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(error.message);
    }

    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const login = async (user: UserRequestBody) => {
  try {
    const userValidate = await userRequestBody.validate(user);

    const res = await AppAxios.post<ResponseJson<{}>>(
      "/auth/login",
      userValidate
    );

    return res.data;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(error.message);
    }

    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AppAxios.post<ResponseJson<{}>>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};
