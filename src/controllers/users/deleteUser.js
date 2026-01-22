import User from "../../models/user.js";
import httpStatus from "http-status";
//controller to delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Not Found",
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
      });
    }
    // Delete the user
    await User.findByIdAndDelete(id);
    return res.status(httpStatus.OK).json({
      status: "Success",
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
};
