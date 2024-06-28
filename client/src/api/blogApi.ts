import { ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { AxiosError } from "axios";

interface ResponseUploadDataBanner {
  url: string;
}
export const uploadBanner = async (image: FileList | null) => {
  try {
    if (!image) {
      throw new Error("Images not Found");
    }

    const formData = new FormData();
    formData.append("image", image[0]);

    const res = await AppAxios.post<ResponseJson<ResponseUploadDataBanner>>(
      "api/blog/banner",
      formData
    );

    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};
