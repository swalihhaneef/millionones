import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, content, category } = req.body;

  if (isNull(name && content && category)) throw new Error("Required fields missing", 412);

  const data = await model
    .Blog({
      ...req.body,
      image: req.file.path.replace("public", ""),
      addedBy: req.user._id,
    })
    .save();

  return new Response("Blog added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, name, content, category } = req.body;

  if (isNull(name && content && category)) throw new Error("Required fields missing", 412);

  if (isNull(id)) throw new Error("Id is required!");

  const data = await model.Blog.findByIdAndUpdate(id, {
    $set: {
      ...req.body,
      updateBy: req.user._id,
    },
  });

  return new Response("Blog updated successfully", { data }, 200);
});

export const deleteBlog = asyncErrorHandler(async (req) => {
  if (isNull(req.params.id)) throw new Error("Id is required");

  await model.Blog.findByIdAndUpdate(req.params.id, {
    $set: {
      status: 1,
    },
  });

  return new Response("Blog deleted successfully", null, 200);
});

export const listBlog = asyncErrorHandler(async (req) => {
  let { page = 1, limit = 20 } = req.query;

  page = Number(page);
  let skip = (page - 1) * Number(limit);

  const data = await model.Blog.find({ status: 0 }).sort({ _id: -1 }).populate("addedBy", "name").populate("category", "name");

  return new Response(null, { data }, 200);
});

export const listBlogWeb = asyncErrorHandler(async (req) => {
  let { page = 1, limit = 20 } = req.query;

  page = Number(page);
  let skip = (page - 1) * Number(limit);

  const data = await model.Blog.find({ status: 0 }).sort({ _id: -1 }).select("-_id -category -addedBy -createdAt -updatedAt -__v -status");

  return new Response(null, { data }, 200);
});

export const latestBlogs = asyncErrorHandler(async (req) => {
  const data = await model.Blog.find({ status: 0 }).sort({ _id: -1 }).limit(5);

  return new Response(null, { data }, 200);
});

export const createUser = async () => {
  try {
    let name = "admin";
    let email = "admin@example.com";
    let password = "admin";
    let ip = "127.0.0.1";

    const existingUser = await model.User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
    }

    const user = model.User({
      name,
      email,
      password: ip,
    });

    user.password = user.generatePasswordHash(password);

    await user.save();

    console.log("User created Successfully");
  } catch (err) {
    console.log(err);
  }
};

// createUser();
