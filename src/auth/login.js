import User from "../models/user.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwtToken from "../utils/generateToken.js";
export const loginUser = async (req, res) => {
  try {
    //destructure data from the request body
    const { email, password } = req.body;
    //check if  user with email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT FOUND",
        statusCode: httpStatus.NOT_FOUND,
        message: "User not Found.",
      });
    }

    //confirm existing by comparing passwords
    const confirmedUser = await bcrypt.compare(password, existingUser.password);

    let token = await jwtToken(
      existingUser._id,
      existingUser.email,
      existingUser.role
    );

    if (confirmedUser) {
      return res.status(httpStatus.OK).json({
        status: "Success",
        statusCode: httpStatus.OK,
        message: "Login Successful",
        data: existingUser,
        token: token,
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      status: "Error",
      statusCode: httpStatus.NOT_FOUND,
      message: "Invalid Credentials.",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Server Error",
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while logging in.",
      error: error.message,
    });
  }
};
