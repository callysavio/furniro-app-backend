import Furniture from "../../models/furniture.js";
import httpStatus from "http-status";
//function to delete furniture by id
export const deleteFurniture = async (req, res) => {
  try {
    const { id } = req.params;
    //Step 1: validate id presence- ID is required to delete furniture
    if (!id) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Furniture id is required",
      });
    }
    //Step 2: check if furniture with the given id exists
    const existingFurniture = await Furniture.findById(id);
    if (!existingFurniture) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: `Furniture with id: ${id} not found`,
      });
    }
    //Step 3: delete furniture from database
    await Furniture.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Furniture deleted successfully",
    });
    //Step 4: handle errors
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Error deleting furniture",
      error: error.message,
    });
  }
};
