import { Handler } from "express";
import * as Yup from "yup";
import { blogIdParams } from "./blogController";
import prisma from "../lib/prisma";
import ResponseJson from "../util/ResponseJson";

const commentBody = Yup.object().shape({
  comment: Yup.string().required(),
});

const commentIdParams = Yup.object().shape({
  id: Yup.string().required(),
});

export const createComment: Handler = async (req, res, next) => {
  try {
    const { comment } = await commentBody.validate(req.body);
    const { id } = await blogIdParams.validate(req.params);

    await prisma.blog.update({
      where: { id },
      data: {
        Comment: {
          create: { comment, author: { connect: req.user } },
        },
      },
    });

    return res.status(201).json(new ResponseJson(true, "Comment Created", {}));
  } catch (error) {
    next(error);
  }
};

export const updateComment: Handler = async (req, res, next) => {
  try {
    const { comment } = await commentBody.validate(req.body);
    const { id } = await commentIdParams.validate(req.params);

    await prisma.comment.update({
      where: { id },
      data: { comment },
    });

    return res.status(204).json(new ResponseJson(true, "Comment Updated", {}));
  } catch (error) {
    next(error);
  }
};

export const deleteComment: Handler = async (req, res, next) => {
  try {
    const { id } = await commentIdParams.validate(req.params);

    await prisma.comment.delete({
      where: { id },
    });

    return res.status(204).json(new ResponseJson(true, "Delete Success", {}));
  } catch (error) {
    next(error);
  }
};
