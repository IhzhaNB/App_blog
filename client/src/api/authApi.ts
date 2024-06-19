import { ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { AxiosError } from "axios";
import * as Yup from "yup";

const userRequestBody = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
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
