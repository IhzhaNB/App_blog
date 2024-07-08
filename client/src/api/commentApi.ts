import { ResponseJson } from "@/types";
import AppAxios from "@/util/AppAxios";
import { AxiosError } from "axios";

interface CreateCommentBody {
  blogId: string;
  commentText: string;
}

interface CommentIdParams {
  commentId: string;
}

interface EditCommentBodyAndId extends CommentIdParams {
  comment: string;
}

export const postComment = async (data: CreateCommentBody) => {
  try {
    const res = await AppAxios.post<ResponseJson<{}>>(
      `/api/comment/${data.blogId}`,
      {
        comment: data.commentText,
      }
    );

    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const deleteComment = async (data: CommentIdParams) => {
  try {
    const res = await AppAxios.delete<ResponseJson<{}>>(
      `/api/comment/${data.commentId}`
    );

    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export const editComment = async (data: EditCommentBodyAndId) => {
  try {
    const res = await AppAxios.patch<ResponseJson<{}>>(
      `/api/comment/${data.commentId}`,
      { comment: data.comment }
    );

    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};
