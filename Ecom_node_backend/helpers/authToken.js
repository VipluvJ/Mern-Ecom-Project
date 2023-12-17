import JWT from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.DEV_MODE !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
  });
};
