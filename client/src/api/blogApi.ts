import { Blog, ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { AxiosError } from "axios";
import * as Yup from "yup";

interface ResponseUploadDataBanner {
  url: string;
}

const blogBody = Yup.object().shape({
  title: Yup.string().required(),
  article: Yup.string().required(),
  banner: Yup.string().required(),
});

interface responseGetDataAllBlogs {
  blogs: Blog[];
}

export interface BlogBody extends Pick<Blog, "title" | "article" | "banner"> {}

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

export const postBlog = async (blog: BlogBody) => {
  try {
    const blogValidate = await blogBody.validate(blog);

    const res = await AppAxios.post<ResponseJson<{}>>("api/blog", blogValidate);

    return res.data;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(error.message);
    }
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await AppAxios.get<ResponseJson<responseGetDataAllBlogs>>(
      "api/blogs"
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
