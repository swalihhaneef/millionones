import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, uwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { title, heading, client, service, category, details, conclusion, img } = req.body;

  if (isNull(title)) throw new Error("title is required");

  if (isNull(img)) throw new Error("image is required");

  const permalink = generatePermalink(heading);

  const exists = await model.Work.findOne({ $or: [{ title }, { permalink }] });

  if (exists) throw new Error(`${exists.title} already exists`);

  const data = await new model.Work({
    title,
    heading,
    details,
    conclusion,
    permalink,
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

  if (isNull(img)) throw new Error("title is required");

  const permalink = generatePermalink(heading);

  const exists = await model.Work.findOne({ _id: { $ne: id }, $or: [{ title }, { permalink }] });

  if (exists) throw new Error(`${exists.title} already exists`);

  const data = await model.Work.findByIdAndUpdate(id, {
    $set: {
      title,
      heading,
      details,
      conclusion,
      img,
      client,
      permalink,
      service,
      category,
      updateBy: req.user._id,
      upDate: currentDate(),
      upTime: currentTime(),
    },
  });

  return new Response(`${data.title} updated successfully`, { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  const query = { status: 0 };

  const count = await model.Work.countDocuments(query);

  const data = await model.Work.find(query).skip(skip).limit(limit).select(uwantedFields());

  return new Response("success", { count, page, limit, data }, 200);
});

export const webList = asyncErrorHandler(async (req) => {
  const { skip, limit, page } = paginationParams(req.query);

  const query = { status: 0 };

  const count = await model.Work.countDocuments(query);

  const data = await model.Work.find(query).skip(skip).limit(limit).select("title img category client").populate("category", "name");

  return new Response("success", { count, page, limit, data }, 200);
});

export const single = asyncErrorHandler(async (req) => {
  let id = req.params.id;

  let query = { status: 0 };

  if (isValidObjectId(id)) query._id = id;
  else query.permalink = id;

  if (isNull(query._id) && isNull(query.permalink)) throw new Error("Please provide a id or permalink");

  const data = await model.Work.findOne(query).select(uwantedFields());

  if (!data) throw new Error("Data not found", 404);

  return new Response("success", { data }, 200);
});

export const deleteWork = asyncErrorHandler(async (req) => {
  const data = await model.Work.updateOne({ _id: req.params.id }, { status: 1 });

  return new Response("Works deleted successfully", null, 200);
});
