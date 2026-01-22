import User from "../../models/user.js";
import httpStatus from "http-status";
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, "name email role");
    if (users.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        statusCode: httpStatus.NOT_FOUND,
        message: "No users found",
      });
    }
    // Return the list of users
    return res.status(httpStatus.OK).json({
      status: "Success",
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: users,
    });
    //handle errors
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while retrieving users",
      error: error.message,
    });
  }
};
