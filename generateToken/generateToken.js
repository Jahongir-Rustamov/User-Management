import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (UserId, res) => {
  const accessToken = jwt.sign({ UserId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5d",
  });
  res.cookie("Task1", accessToken, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.Node_Env !== "development",
  });
  return accessToken;
};

export default generateToken;