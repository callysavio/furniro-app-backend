import User from "../../models/user.js";
import httpStatus from "http-status";
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch user by ID from the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    } else {
      // Return the user details
      return res.status(httpStatus.OK).json({
        status: "Success",
        statusCode: httpStatus.OK,
        message: "User's details retrieved successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while retrieving the user",
      error: error.message,
    });
  }
};
