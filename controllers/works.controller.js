import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";
import { ALL_CATEGORY } from "../constants.js";

export const create = asyncErrorHandler(async (req) => {
  const { title, heading, client, service, category, details, conclusion, img } = req.body;

  if (isNull(title)) throw new Error("title is required");

  if (isNull(img)) throw new Error("image is required");

  const slug = generatePermalink(heading);

  const exists = await model.Work.findOne({ $or: [{ title }, { slug }] });

  if (exists) throw new Error(`${exists.title} already exists`);

  const data = await new model.Work({
    title,
    heading,
    details,
    conclusion,
    slug,
    img,
    client,
    service,
    category,
    addedBy: req.user._id,
  }).save();

  return new Response("Works addedd successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { title, heading, id, client, service, category, details, conclusion, img } = req.body;

  if (isNull(id)) throw new Error("works id is required");

  if (isNull(title)) throw new Error("title is required");

  if (isNull(img)) throw new Error("image is required");

  const slug = generatePermalink(heading);

  const exists = await model.Work.findOne({ _id: { $ne: id }, $or: [{ title }, { slug }] });

  if (exists) throw new Error(`${exists.title} already exists`);

  const data = await model.Work.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        heading,
        details,
        conclusion,
        img,
        client,
        slug,
        service,
        category,
        updateBy: req.user._id,
        upDate: currentDate(),
        upTime: currentTime(),
      },
    },
    { new: true }
  );

  return new Response(`${data.title} updated successfully`, { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  const query = { status: 0 };

  const count = await model.Work.countDocuments(query);

  const data = await model.Work.find(query).skip(skip).limit(limit).select(unwantedFields()).sort({ _id: -1 });

  return new Response("success", { count, page, limit, data }, 200);
});

export const webList = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  const { category } = req.query;

  const query = { status: 0 };

  if (!isNull(category) && category !== ALL_CATEGORY) query.category = category;

  const count = await model.Work.countDocuments(query);

  const data = await model.Work.find(query)
    .skip(skip)
    .limit(limit)
    .select("title img category client slug")
    .populate("category", "name")
    .sort({ _id: -1 });

  return new Response("success", { count, page, limit, data }, 200);
});

export const details = asyncErrorHandler(async (req) => {
  let id = req.params.id;

  let query = { status: 0 };

  if (isValidObjectId(id)) query._id = id;
  else query.slug = id;

  if (isNull(query._id) && isNull(query.slug)) throw new Error("Please provide a id or slug");

  const data = await model.Work.findOne(query).select(unwantedFields()).populate("category", "name");

  if (!data) throw new Error("Data not found", 404);

  return new Response("success", { data }, 200);
});

export const deleteWork = asyncErrorHandler(async (req) => {
  await model.Work.updateOne({ _id: req.params.id }, { status: 1 });

  return new Response("Works deleted successfully", null, 200);
});

export const relatedWorks = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  let { category, slug } = req.query;

  if (!isNull(slug)) {
    const work = await model.Work.findOne({ slug }).select("category");

    if (!work) throw new Error("Work not found", 404);
    category = work.category;
  }

  if (isNull(category)) throw new Error("Category or slug is required");

  const query = { status: 0, category };

  const count = await model.Work.countDocuments(query);

  const data = await model.Work.find(query).skip(skip).limit(limit).select("title img client slug").sort({ _id: -1 });

  return new Response("success", { count, data }, 200);
});
