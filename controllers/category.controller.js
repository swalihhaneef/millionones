import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";
import { currentDate, currentTime, paginationParams } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  let { name, desc, type, brands } = req.body;

  console.log(req.body);

  if (isNull(name && desc && type)) throw new Error("Required fields missing", 412);

  if (isNull(req.file)) throw new Error("Image is required", 412);

  type = type.split(",");
  brands = brands ? brands.split(",").filter(Boolean) : [];

  const exists = await model.Category.findOne({ name });

  if (exists) throw new Error(`${exists.name} already exists`, 400);

  const data = await model.Category({ ...req.body, type, brands, image: req.file.path.replace("public", ""), addedBy: req.user._id }).save();

  return new Response(`category added successfully`, { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  let { id, name, desc, type, brands } = req.body;

  if (isNull(name && desc && type)) throw new Error("Required fields missing", 412);

  if (isNull(id)) throw new Error("Id is required!");

  const exists = await model.Category.findOne({ _id: { $ne: id }, name });

  if (exists) throw new Error("category already exists", 400);

  type = type.split(",");
  brands = brands ? brands.split(",").filter(Boolean) : [];

  const data = await model.Category.findByIdAndUpdate(
    id,
    {
      $set: {
        ...req.body,
        type,
        brands,
        image: req?.file?.path ? req.file.path.replace("public", "") : req.body.image,
        updateBy: req.user._id,
        upDate: currentDate(),
        upTime: currentTime(),
      },
    },
    { new: true }
  );

  return new Response(`category updated successfully`, { data }, 200);
});

export const deleteCategory = asyncErrorHandler(async (req) => {
  if (isNull(req.params.id)) throw new Error("Id is required");

  await model.Category.findByIdAndUpdate(req.params.id, {
    $set: {
      status: 1,
      updateBy: req.user._id,
    },
  });

  return new Response(`category deleted successfully`, null, 200);
});

export const listCategory = asyncErrorHandler(async (req) => {
  const { skip, limit } = paginationParams(req.query);

  const data = await model.Category.find({ status: 0 }).sort({ order: 1, _id: -1 }).populate("addedBy", "name");

  return new Response(null, { data }, 200);
});
