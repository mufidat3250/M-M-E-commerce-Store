import { Response } from "express";

// create token and save in cookies
const sendToken = (user: any, statusCode: number, res: Response) => {
  const token = user.getJwtToken;
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken