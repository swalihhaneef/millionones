import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { counter, currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, sec1, sec2, sec3, sec4, sec5, sec6, faq, category } = req.body;

  if (isNull(name && category)) throw new Error("name and category are required", 412);

  const slug = generatePermalink(name);

  const exists = await model.Service.findOne({ $or: [{ name }, { slug }] });

  if (exists) throw new Error(`${exists.name} already exists.`);

  const data = await new model.Service({
    name,
    slug,
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    faq,
    category,
    addedBy: req.user._id,
  }).save();

  return new Response("service added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, name, sec1 = {}, sec2 = [], sec3 = {}, sec4 = {}, sec5 = {}, sec6 = {}, faq = [], category } = req.body;

  if (isNull(id)) throw new Error("Service Id is required");

  const slug = generatePermalink(name);

  const exists = await model.Service.findOne({ _id: { $ne: id }, $or: [{ name }, { slug }] });

  if (exists) throw new Error(`${exists.name} already exists.`);

  const data = await model.Service.findByIdAndUpdate(id, {
    name,
    slug,
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    faq,
    category,
    updateBy: req.user._id,
    upDate: currentDate(),
    upTime: currentTime(),
  });

  return new Response("service updated successfully", { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const { category } = req.query;

  const { skip, limit } = paginationParams(req.query);

  const query = { status: 0 };

  if (!isNull(category)) query.category = category;

  const data = await model.Service.find(query).sort({ _id: -1 }).skip(skip).limit(limit).select(unwantedFields()).lean();

  return new Response("success", { data }, 200);
});

export const webList = asyncErrorHandler(async (req) => {
  const { category } = req.query;

  const { skip, limit } = paginationParams(req.query);

  const query = { status: 0 };

  if (!isNull(category)) query.category = category;

  const data = await model.Service.find(query).sort({ _id: -1 }).skip(skip).limit(limit).select(`name slug`).populate("category", "name").lean();

  return new Response("success", { data }, 200);
});

export const details = asyncErrorHandler(async (req) => {
  const id = req.params.id;

  const query = { status: 0 };

  if (isValidObjectId(id)) query._id = id;
  else query.slug = id;

  const data = await model.Service.findOne(query);

  if (!data) throw new Error("Data not found", 404);

  return new Response("success", { data }, 200);
});

export const deleteService = asyncErrorHandler(async (req) => {
  await model.Service.updateOne({ _id: req.params.id }, { status: 1 });

  return new Response("Service deleted successfully", null, 200);
});
