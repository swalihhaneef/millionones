import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { counter, currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { title, desc, department, location, jobType, requirements = [] } = req.body;

  if (isNull(title)) throw new Error("title is required", 412);
  if (isNull(desc)) throw new Error("description is required", 412);
  if (isNull(department)) throw new Error("department is required", 412);
  if (isNull(location)) throw new Error("location is required", 412);

  if (requirements.length === 1) throw new Error("requirements is required", 412);

  const slug = generatePermalink(title);

  const exists = await model.JobPost.findOne({ $or: [{ title }, { slug }] });

  if (exists) throw new Error(`${exists.title} already exists`, 400);

  const uniqueId = await counter(model.JobPost, "JOB");

  const data = await model
    .JobPost({
      title,
      desc,
      slug,
      department,
      location,
      jobType,
      requirements,
      uniqueId,
      addedBy: req.user._id,
    })
    .save();

  return new Response("job post added successfully", { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, title, desc, department, location, jobType, requirements = [] } = req.body;

  if (isNull(id)) throw new Error("job post id is required");

  if (isNull(title)) throw new Error("title is required", 412);
  if (isNull(desc)) throw new Error("description is required", 412);
  if (isNull(department)) throw new Error("department is required", 412);
  if (isNull(location)) throw new Error("location is required", 412);

  if (requirements.length === 1) throw new Error("requirements is required", 412);

  const slug = generatePermalink(title);

  const exists = await model.JobPost.findOne({ _id: { $ne: id }, $or: [{ title }, { slug }] });

  if (exists) throw new Error(`${exists.title} already exists`, 400);

  const data = await model.JobPost.findByIdAndUpdate(id, {
    title,
    desc,
    slug,
    department,
    location,
    jobType,
    requirements,
    updateBy: req.user._id,
    upDate: currentDate(),
    upTime: currentTime(),
  });

  return new Response("job post updated successfully", { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const query = { status: { $ne: 1 } };

  const { skip, limit } = paginationParams(req.query);

  const count = await model.JobPost.countDocuments(query);

  const data = await model.JobPost.find(query).sort({ _id: -1 }).skip(skip).limit(limit).select(unwantedFields());

  return new Response(null, { count, data }, 200);
});

export const details = asyncErrorHandler(async (req) => {
  const id = req.params.id;

  const query = { status: 0 };

  if (isValidObjectId(id)) query._id = id;
  else query.slug = id;

  const data = await model.JobPost.findOne(query).select(unwantedFields());

  return new Response(null, { data }, 200);
});

export const deleteJobPost = asyncErrorHandler(async (req) => {
  await model.JobPost.updateOne({ _id: req.params.id }, { status: 1 });

  return new Response("job post deleted successfully", null, 200);
});

export const statusUpdate = asyncErrorHandler(async (req) => {
  const { id, status } = req.body;

  await model.JobPost.updateOne({ _id: id }, { $set: { status } });

  return new Response(`job post ${status === 0 ? "active" : "inactive"}`, null, 200);
});

export const webList = asyncErrorHandler(async (req) => {
  const query = { status: 0 };

  const { skip, limit } = paginationParams(req.query);

  const count = await model.JobPost.countDocuments(query);

  const data = await model.JobPost.find(query)
    .select("title desc  department location jobType requirements slug")
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  return new Response(null, { count, data }, 200);
});
