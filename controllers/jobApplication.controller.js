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
