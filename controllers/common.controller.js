import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";

export const category = asyncErrorHandler(async (req) => {
  const data = await model.Category.find({ status: 0 })
    .select({
      _id: 0,
      label: "$name",
      value: "$_id",
    })
    .sort({ order: 1 });

  return new Response(null, { data }, 200);
});
