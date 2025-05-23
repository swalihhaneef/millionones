import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";

export const category = asyncErrorHandler(async (req) => {
  const { type } = req.query;
  const query = { status: 0 };

  if (!isNull(type)) query.type = { $in: type };

  const data = await model.Category.find(query)
    .select({
      _id: 0,
      label: "$name",
      value: "$_id",
      image: "$image",
      desc: 1,
    })
    .sort({ order: 1 });

  return new Response(null, { data }, 200);
});
