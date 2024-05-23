require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const User = require("../models/users");
const path = require("node:path");

const bycrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, password } = request.body;
  const userEmail = User.findOne({ email });
  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ error: "name, email and password must be provided" });
  } 
  const fileName = request.file?.filename;
  console.log({fileName, request, path})
  const fileUrl = path.join(fileName);
  const saltRound = 10;
  const passwordHash = await bycrypt.hash(password, saltRound);
console.log({fileUrl}, 'file-url')
  const user = await User.create({
    name,
    email,
    passwordHash,
    avatar: fileUrl
  });
  const token = JWT.sign(
    { name: user.name, userId: user.id },
    process.env.JWTSECRET
  );
  return response
    .status(201)
    .json({ name: user.name, email: user.email, token });
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  const isPasswordCorrect =
    user === null ? false : await bycrypt.compare(password, user.passwordHash);
  if (!user || !isPasswordCorrect) {
    response.status(400).json({ error: "invalid username or password" });
  }
  const token = JWT.sign(
    { name: user.name, userId: user.id },
    process.env.JWTSECRET
  );
  response.status(200).json({ name: user.name, email: user.email, token });
};
module.exports = {
  createUser,
  login,
};
