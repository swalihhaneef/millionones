import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import model from "../model/index.js";
import jwt from "jsonwebtoken";

export const loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await model.User.findOne({ email });

  if (!user) throw new Error("Invalid email or password", 400);

  const isValid = user.validatePassword(password, user.password);

  if (!isValid) throw new Error("Invalid email or password", 400);

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  const accessTokenMaxAge = 30 * 24 * 60 * 60 * 1000;

  res.cookie("tkn", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: accessTokenMaxAge,
  });

  return new Response(
    null,
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    200
  );
});

export const logoutUser = asyncErrorHandler(async (req, res) => {
  try {
    res.clearCookie("tkn", {
      sameSite: "strict",
    });

    return new Response("Logout successful", null, 200);
  } catch (error) {
    console.error(error.message);
    throw new Error("Unable to logout, please try again later", 400);
  }
});
