import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";
import { paginationParams, unwantedFields } from "../helper/functions.js";

export const web = asyncErrorHandler(async (req) => {
  const { firstName, lastName, email, mobile, remarks, additional } = req.body;

  if (isNull(firstName)) throw new Error("name is required", 412);

  if (isNull(email)) throw new Error("email is required", 412);

  if (isNull(mobile)) throw new Error("mobile is required", 412);

  await model
    .Contact({
      firstName,
      lastName,
      email,
      mobile,
      remarks,
      additional,
    })
    .save();

  return new Response("Thank you for contacting us!", null, 200);
});

export const list = asyncErrorHandler(async (req) => {
  const query = { status: 0 };
  const { limit, skip } = paginationParams(req.query);

  const count = await model.Contact.countDocuments(query);

  const data = await model.Contact.find(query).skip(skip).limit(limit).select(unwantedFields()).sort({ _id: -1 });

  return new Response(null, { count, data }, 200);
});
