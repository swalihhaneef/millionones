import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import fs from "fs";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export const countries = asyncErrorHandler(async (req) => {
  const data = await model.Country.find({ status: 0 }).sort({ name: 1 }).select({
    label: "$name",
    value: "$id",
  });

  return new Response(null, { data }, 200);
});

export const states = asyncErrorHandler(async (req) => {
  if (isNull(req.query.country)) throw new Error("Please provide country id", 412);

  const data = await model.State.find({ status: 0, country_id: req.query.country }).sort({ name: 1 }).select({
    label: "$name",
    value: "$_id",
  });

  return new Response(null, { data }, 200);
});

const accessAsync = promisify(fs.access);

export const deleteImage = asyncErrorHandler(async (req) => {
  try {
    let { path: pathName } = req.query;

    if (!pathName) throw new Error("Path is required");

    pathName = path.join(__dirname, "../public", pathName);

    console.log(pathName);

    // Use promisified access
    await accessAsync(pathName);

    // Optionally delete the file
    await promisify(fs.unlink)(pathName);

    return new Response("Deleted successfully", null, 200);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("File not found", 404);
    } else throw new Error(error.message || "Failed to delete image");
  }
});
