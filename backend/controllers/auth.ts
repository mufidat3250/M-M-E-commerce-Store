require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const User = require("../models/user");
const path = require("node:path");
const sendMail = require("../utils/sendMail");

const bycrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, password } = request.body;
  const userEmail = await User.findOne({ email });
  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ error: "name, email and password must be provided" });
  }
  if (userEmail) {
    return response.status(400).json({ error: "Email exist in our data base" });
  }
  const fileName = request.file?.filename;
  const fileUrl = path.join(fileName);
  const saltRound = 10;
  const passwordHash = await bycrypt.hash(password, saltRound);
  const user = {
    name,
    email,
    passwordHash,
    avatar: fileUrl,
  };
  // const user = await User.create({
  //   name,
  //   email,
  //   passwordHash,
  //   avatar: fileUrl
  // });
  const activationToken = createActivationToken(user);
  const activationURL = `http://localhost:5173/activation/${activationToken}`;

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    message: `Hello ${user.name} please click on the link below to activate your account! ${activationURL}`,
  });
  return response
    .status(201)
    .json({
      success: true,
      message: `Please check your email ${user.email} to activate your account`,
    });
};

const createActivationToken = (user: {
  name: string;
  email: string;
  passwordHash: string;
  avatar: File;
}) => {
  const token =  JWT.sign(user, process.env.JWTSECRET, { expiresIn: 60 * 60 });
  return token;
};

const activation = async (req: Request, res: Response) => {
  const { activation_token } = req.body;
  console.log(activation_token)
  const newUser = await JWT.verify(activation_token, process.env.JWTSECRET);
  console.log(newUser);
  if (!newUser) {
    return res.status(400).json({ message: "Invalid Token" });
  }
  const { name, email, passwordHash, avatar } = newUser;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }
  user = await User.create({
    name,
    email,
    passwordHash,
    avatar,
  });
  sendToken(user, 201, res);
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
  activation,
  login,
};

// require("dotenv").config();
// import { Request, Response, NextFunction } from "express";
// const User = require("../models/user");
// const path = require("node:path");
// const sendMail = require("../utils/sendMail");

// const bycrypt = require("bcrypt");
// const JWT = require("jsonwebtoken");

// const createUser = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { name, email, password } = request.body;
//   const userEmail = await User.findOne({ email });
//   if (!name || !email || !password) {
//     return response
//       .status(400)
//       .json({ error: "name, email and password must be provided" });
//   }
//   if (userEmail) {
//     return response
//       .status(400)
//       .json({ error: " User already exist in our data base" });
//   }
//   const fileName = request.file?.filename;
//   const fileUrl = path.join(fileName);
//   const saltRound = 10;
//   const passwordHash = await bycrypt.hash(password, saltRound);
//   const user = await User.create({
//     name,
//     email,
//     passwordHash,
//     avatar: fileUrl,
//   });
//   // const activationToken = createActivationToken(user);
//   const token = JWT.sign(user, process.env.JWTSECRET, { expiresIn: 60 * 60 });
//   // console.log(activationToken)
//   // const activationURL = `http//localhost8000/activation/${activationToken}`;
//   // await sendMail({
//   //   email: user.email,
//   //   subject: "Activate your account",
//   //   message: `Hello ${user.name} please click on the link to activate your account! ${activationURL}`,
//   // });
//   return response
//     .status(201)
//     .json({
//       success: true,
//       message: "Please chack your mail to activate your account",
//     });
// };

// const createActivationToken = (user: {
//   name: string;
//   email: string;
//   passwordHash: string;
//   avatar: File;
// }) => {
//   const token = JWT.sign(user, process.env.JWTSECRET, { expiresIn: 60 * 60 });
//   return token;
// };

// const login = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const { email, password } = request.body;
//   const user = await User.findOne({ email });
//   const isPasswordCorrect =
//     user === null ? false : await bycrypt.compare(password, user.passwordHash);
//   if (!user || !isPasswordCorrect) {
//     response.status(400).json({ error: "invalid username or password" });
//   }
//   const token = JWT.sign(
//     { name: user.name, userId: user.id },
//     process.env.JWTSECRET
//   );
//   response.status(200).json({ name: user.name, email: user.email, token });
// };
// module.exports = {
//   createUser,
//   login,
// };
