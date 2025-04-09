import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";

export const blogCategory = asyncErrorHandler(async (req) => {
  const data = await model.BlogCategory.find({ status: 0 }).select("name");

  return new Response(null, { data }, 200);
});
