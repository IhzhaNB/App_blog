import { Handler } from "express";
import ResponseJson from "../util/ResponseJson";
import * as Yup from "yup";
import prisma from "../lib/prisma";

const blogBody = Yup.object().shape({
  title: Yup.string().required(),
  article: Yup.string().required(),
  banner: Yup.string().required(),
});

export const blogIdParams = Yup.object().shape({
  id: Yup.string().required(),
});

export const uploadBanner: Handler = (req, res) => {
  return res.status(201).json(
    new ResponseJson(true, "Banner Uploaded", {
      url: "http://localhost:3000/static/" + req.file?.filename,
    })
  );
};

export const createBlog: Handler = async (req, res, next) => {
  try {
    const { title, article, banner } = await blogBody.validate(req.body);

    await prisma.blog.create({
      data: {
        title,
        article,
        banner,
        author: {
          connect: req.user,
        },
      },
    });

    return res.status(201).json(new ResponseJson(true, "Blog Created", {}));
  } catch (error) {
    return next(error);
  }
};

export const getAllBlogs: Handler = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({ include: { author: true } });
    return res
      .status(200)
      .json(new ResponseJson(true, "Get All Blogs Success", { blogs }));
  } catch (error) {
    return next(error);
  }
};
export const getBlog: Handler = async (req, res, next) => {
  try {
    const { id } = await blogIdParams.validate(req.params);

    const blog = await prisma.blog.findFirst({
      where: { id },
      include: {
        author: { select: { id: true, username: true } },
        Comment: {
          include: { author: { select: { id: true, username: true } } },
        },
      },
    });

    return res
      .status(200)
      .json(new ResponseJson(true, "Get Blog Success", { blog }));
  } catch (error) {
    return next(error);
  }
};
