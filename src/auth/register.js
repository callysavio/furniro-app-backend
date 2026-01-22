import User from "../models/user.js";
import httpStatus from "http-status";
import { registerSchema } from "../validators/registerValidator.js";
import bcrypt from "bcrypt";
// Register a new user
export const registerUser = async (req, res) => {
  try {
    //validate the request body(users inputs)
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }

    //Step 1: Extract user details from the request body
    const { name, email, password, role } = req.body;

    //Step 2: Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User with this email already exists.",
      });
    }
    //Step 3: Hash plain password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Step 4: Create a new user instance
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    //Step 4: Send a success response
    return res.status(httpStatus.CREATED).json({
      message: "User registered successfully.",
      data: newUser,
    });

    //Step 5: Handle errors
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while registering the user.",
      error: error.message,
    });
  }
};
