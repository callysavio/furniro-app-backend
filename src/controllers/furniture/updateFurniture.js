import Furniture from "../../models/furniture.js";
import httpStatus from "http-status";
//update furniture controller
export const updateFurniture = async (req, res) => {
  try {
    //step 1: destructure furniture details from request body and params
    const {
      name,
      price,
      tags,
      category,
      description,
      size,
      color,
      inStock,
      quantity,
      discount,
    } = req.body;
    const { id } = req.params;

    //step 2: check if furniture with the given id exists
    const existingFurniture = await Furniture.findById(id);
    if (!existingFurniture) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "Error",
        message: `Furniture with the given id: ${id} does not exist.`,
      });
    } else {
      //Step 3: update furniture details
      existingFurniture.name = name || existingFurniture.name;
      existingFurniture.price = price || existingFurniture.price;
      existingFurniture.tags = tags || existingFurniture.tags;
      existingFurniture.category = category || existingFurniture.category;
      existingFurniture.description =
        description || existingFurniture.description;
      existingFurniture.size = size || existingFurniture.size;
      existingFurniture.color = color || existingFurniture.color;
      existingFurniture.inStock = inStock || existingFurniture.inStock;
      existingFurniture.quantity = quantity || existingFurniture.quantity;
      existingFurniture.discount = discount || existingFurniture.discount;

      //Step 4: save updated furniture to database
      await existingFurniture.save();

      //step 5: send response back to client
      return res.status(httpStatus.OK).json({
        status: "Success",
        message: "Furniture updated successfully",
        data: existingFurniture,
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
