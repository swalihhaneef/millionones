import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, content, category } = req.body;

  if (isNull(name && content && category)) throw new Error("Required fields missing", 412);

  const data = await model
    .Blog({
      ...req.body,
      addedBy: req.user._id,
    })
    .save();

  return new Response("Blog added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  return new Response("success", null, 200);
});

export const deleteBlog = asyncErrorHandler(async (req) => {
  return new Response("success", null, 200);
});

export const listBlog = asyncErrorHandler(async (req) => {
  return new Response("success", null, 200);
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
