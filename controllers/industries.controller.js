import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { counter, currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, desc, content } = req.body;

  if (isNull(name)) throw new Error("title is required", 412);
  if (isNull(desc)) throw new Error("description is required", 412);
  if (isNull(content)) throw new Error("content is required", 412);

  const slug = generatePermalink(name);

  const exists = await model.Industries.findOne({ $or: [{ name }, { slug }] });

  if (exists) throw new Error(`${exists.name} already exists`, 400);

  const data = await model
    .Industries({
      name,
      desc,
      slug,
      content,
      addedBy: req.user._id,
    })
    .save();

  return new Response("industries added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, name, desc, content } = req.body;

  if (isNull(id)) throw new Error("job post id is required");

  if (isNull(name)) throw new Error("title is required", 412);
  if (isNull(desc)) throw new Error("description is required", 412);
  if (isNull(content)) throw new Error("content is required", 412);

  const slug = generatePermalink(name);

  const exists = await model.Industries.findOne({ _id: { $ne: id }, $or: [{ name }, { slug }] });

  if (exists) throw new Error(`${exists.name} already exists`, 400);

  const data = await model.Industries.findByIdAndUpdate(id, {
    name,
    desc,
    slug,
    content,
    updateBy: req.user._id,
    upDate: currentDate(),
    upTime: currentTime(),
  });

  return new Response("industries updated successfully", { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const query = { status: { $ne: 1 } };

  const { skip, limit } = paginationParams(req.query);

  const count = await model.Industries.countDocuments(query);

  const data = await model.Industries.find(query).sort({ _id: -1 }).skip(skip).limit(limit).select(unwantedFields());

  return new Response(null, { count, data }, 200);
});

export const deleteIndustry = asyncErrorHandler(async (req) => {
  await model.Industries.updateOne({ _id: req.params.id }, { status: 1, updateBy: req.user._id });

  return new Response("industries deleted successfully", null, 200);
});

export const webList = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  const query = { status: 0 };

  console.log("working");

  const count = await model.Industries.countDocuments(query);

  const data = await model.Industries.find(query).skip(skip).limit(limit).select("name slug desc").sort({ _id: -1 });

  return new Response("success", { count, page, limit, data }, 200);
});

export const details = asyncErrorHandler(async (req) => {
  let id = req.params.id;

  let query = { status: 0 };

  if (isValidObjectId(id)) query._id = id;
  else query.slug = id;

  if (isNull(query._id) && isNull(query.slug)) throw new Error("Please provide a id or slug");

  const data = await model.Industries.findOne(query).select(unwantedFields());

  if (!data) throw new Error("Data not found", 404);

  return new Response("success", { data }, 200);
});
