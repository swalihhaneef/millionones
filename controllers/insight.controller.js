import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";
import { currentDate, currentTime, generatePermalink, paginationParams } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, content, type } = req.body;

  if (isNull(name && content && type)) throw new Error("Required fields missing", 412);

  if (isNull(req.file)) throw new Error("Image is required", 412);

  const permalink = generatePermalink(name);

  const exists = await model.Insight.findOne({ permalink });

  if (exists) throw new Error("Permalink already exists", 400);

  const data = await model.Insight({ ...req.body, permalink, image: req.file.path.replace("public", ""), addedBy: req.user._id }).save();

  return new Response(`${type} added successfully`, { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, name, content, type } = req.body;

  if (isNull(name && content && type)) throw new Error("Required fields missing", 412);

  if (isNull(id)) throw new Error("Id is required!");

  const permalink = generatePermalink(name);

  const exists = await model.Insight.findOne({ _id: { $ne: id }, permalink });

  if (exists) throw new Error("Permalink already exists", 400);

  const data = await model.Insight.findByIdAndUpdate(id, {
    $set: {
      ...req.body,
      image: req?.file?.path ? req.file.path.replace("public", "") : req.body.image,
      updateBy: req.user._id,
      upDate: currentDate(),
      upTime: currentTime(),
    },
  });

  return new Response(`${type} updated successfully`, { data }, 200);
});

export const deleteInsight = asyncErrorHandler(async (req) => {
  if (isNull(req.params.id)) throw new Error("Id is required");

  const data = await model.Insight.findByIdAndUpdate(req.params.id, {
    $set: {
      status: 1,
    },
  });

  return new Response(`${data.type} deleted successfully`, null, 200);
});

export const listInsight = asyncErrorHandler(async (req) => {
  const { skip, limit } = paginationParams(req.query);

  const data = await model.Insight.find({ status: 0 }).sort({ _id: -1 }).populate("addedBy", "name");

  return new Response(null, { data }, 200);
});

export const listDetailsWeb = asyncErrorHandler(async (req) => {
  const type = req.params.type;

  if (!["blog", "event", "news"].includes(type)) throw new Error("Invalid type");

  const { skip, limit } = paginationParams(req.query);

  const count = await model.Insight.countDocuments({ status: 0, type });

  const data = await model.Insight.find({ status: 0, type }).sort({ _id: -1 }).skip(skip).limit(limit).select("name desc permalink image");

  return new Response(null, { data, count }, 200);
});

export const insightDetailList = asyncErrorHandler(async (req) => {
  const permalink = req.params.permalink;

  const data = await model.Insight.findOne({ permalink }).select("name desc content writer image type readMin");

  return new Response(null, { data }, 200);
});

export const latestDetails = asyncErrorHandler(async (req) => {
  const type = req.params.type;

  if (!["blog", "event", "news"].includes(type)) throw new Error("Invalid type");

  const data = await model.Insight.find({ status: 0, type }).select("name desc permalink image").sort({ _id: -1 }).limit(3);

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
