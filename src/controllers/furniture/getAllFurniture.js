import Furniture from "../../models/furniture.js";
import httpStatus from "http-status";

// Get all furniture controller
export const fetchAllFurniture = async (req, res) => {
  try {
    // Fetch all furniture items from the database
    const furniture = await Furniture.find(
      {},
      "name price discount category images"
    );
    if (!furniture || furniture.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No furniture found.",
      });
    } else {
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: "Furniture fetched successfully.",
        data: furniture,
        // data: furniture.map((furniture) => ({
        //   id: furniture._id,
        //   name: furniture.name,
        //   price: furniture.price,
        //   discount: furniture.discount,
        //   category: furniture.category,
        //   images: furniture.images,
        // })),
      });
    }
  } catch (error) {
    console.error("Error fetching furniture:", error);
  }
};
