import Furniture from "../../models/furniture.js";
import httpStatus from "http-status";

// function to create a new furniture item
export const createFurniture = async (req, res) => {
  try {
    //step 1: destructure furniture details from request body
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

    //step 2: check if furniture with the same name already exists
    const existingFurniture = await Furniture.findOne({ name });
    if (existingFurniture) {
      return res.status(httpStatus.CONFLICT).json({
        status: "Error",
        message: "Furniture with the same name already exists.",
      });
    }

    //step 3: create a new furniture item
    const newFurniture = await Furniture.create({
      name: name,
      price: price,
      tags: tags,
      category: category,
      description: description,
      size: size,
      color: color,
      inStock: inStock,
      quantity: quantity,
      discount: discount,
    });

    //step 4: send response back to client
    return res.status(httpStatus.CREATED).json({
      status: "Success",
      message: "Furniture created successfully",
      data: newFurniture,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
