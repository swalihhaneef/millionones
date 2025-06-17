import { asyncErrorHandler, Error, Response } from "express-error-catcher";

import model from "../model/index.js";
import { currentDate, currentTime, paginationParams } from "../helper/functions.js";

export const create = asyncErrorHandler(async (req) => {
  const { name, designation, image, testimonial } = req.body;

  if (isNull(name && designation && testimonial)) throw new Error("Required fields missing", 412);

  if (isNull(image)) throw new Error("Image is required", 412);

  const exists = await model.Testimonial.findOne({ name });

  if (exists) throw new Error("Testimonial with this name already exists", 400);

  const data = await model.Testimonial({ ...req.body, addedBy: req.user._id }).save();

  return new Response(`Testimonial added successfully`, { data }, 200);
});

export const update = asyncErrorHandler(async (req) => {
  const { id, name, designation, image, url, testimonial } = req.body;

  if (isNull(name && designation && testimonial)) throw new Error("Required fields missing", 412);

  if (isNull(id)) throw new Error("Id is required!");

  if (isNull(image)) throw new Error("Image is required", 412);

  const exists = await model.Testimonial.findOne({ _id: { $ne: id }, name });

  if (exists) throw new Error("Testimonial with this name already exists", 400);

  const data = await model.Testimonial.findByIdAndUpdate(id, {
    $set: {
      ...req.body,
      updateBy: req.user._id,
      upDate: currentDate(),
      upTime: currentTime(),
    },
  });

  return new Response(`Testimonial updated successfully`, { data }, 200);
});

export const deleteTestimonial = asyncErrorHandler(async (req) => {
  if (isNull(req.params.id)) throw new Error("Id is required");

  const data = await model.Testimonial.findByIdAndUpdate(req.params.id, {
    $set: {
      status: 1,
    },
  });

  return new Response(`${data.type} deleted successfully`, null, 200);
});

export const listTestimonial = asyncErrorHandler(async (req) => {
  const { skip, limit } = paginationParams(req.query);

  const data = await model.Testimonial.find({ status: 0 }).sort({ _id: -1 }).populate("addedBy", "name");

  return new Response(null, { data }, 200);
});

export const listTestimonialWeb = asyncErrorHandler(async (req) => {
  const { skip, limit } = paginationParams(req.query);

  const data = await model.Testimonial.find({ status: 0 }).sort({ _id: -1 }).skip(skip).limit(limit);

  return new Response(null, { data }, 200);
});

export const testimonialDetails = asyncErrorHandler(async (req) => {
  const data = await model.Testimonial.findOne({ id: req.params.id });

  if (!data) throw new Error("Testimonial not found", 404);

  return new Response(null, { data }, 200);
});
