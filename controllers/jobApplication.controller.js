import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import { counter, currentDate, currentTime, generatePermalink, isValidObjectId, paginationParams, unwantedFields } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { email, mobile, jobId } = req.body;

  if (isNull(email)) throw new Error("Email is required", 412);

  if (isNull(mobile)) throw new Error("Mobile is required", 412);

  if (isNull(jobId)) throw new Error("Please select a job", 412);

  const exists = await model.JobApplication.findOne({ $or: [{ email }, { mobile }], jobId });

  if (exists) throw new Error("You have already applied for this job", 400);

  const uniqueId = await counter(model.JobApplication, "JOBREQ");

  const data = await model.JobApplication({ ...req.body, uniqueId, resume: req?.file?.path.replace("public", "") }).save();

  return new Response("Job application submitted successfully", { data }, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const data = await model.JobApplication.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $lookup: {
        localField: "country",
        foreignField: "id",
        from: "countries",
        as: "countryData",
      },
    },
    {
      $lookup: {
        localField: "state",
        foreignField: "id",
        from: "states",
        as: "stateData",
      },
    },
    {
      $lookup: {
        localField: "jobId",
        foreignField: "_id",
        from: "jobposts",
        as: "jobData",
      },
    },
    {
      $project: {
        name: { $concat: [{ $ifNull: ["$firstName", ""] }, " ", { $ifNull: ["$lastName", ""] }] },
        email: 1,
        mobile: 1,
        yrsOfExp: 1,
        remarks: 1,
        uniqueId: 1,
        date: 1,
        time: 1,
        resume: 1,
        job: {
          title: { $arrayElemAt: ["$jobData.title", 0] },
          jobId: { $arrayElemAt: ["$jobData.uniqueId", 0] },
        },
        country: { $arrayElemAt: ["$countryData.name", 0] },
        state: { $arrayElemAt: ["$stateData.name", 0] },
      },
    },
  ]);

  return new Response(null, { data }, 200);
});
