import Furniture from "../../models/furniture.js";
import httpStatus from "http-status";
//function to get single furniture by id
export const getSingleFurnitureById = async (req, res) => {
  try {
    //step 1: get id from req.params
    const { id } = req.params;
    //step 2: validate id presence- ID is required to fetch furniture
    if (!id) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Furniture id is required",
      });
    }
    //step 3: fetch furniture from database using the id
    const furniture = await Furniture.findById(id);
    if (!furniture) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: `Furniture with id: ${id} not found`,
      });
    }
    //step 4: return the furniture details in response
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Furniture details fetched successfully",
      data: furniture,
    });
  } catch (error) {
    //step 5: handle errors
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Error fetching furniture",
      error: error.message,
    });
  }
};
