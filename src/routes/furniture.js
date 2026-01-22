import express from "express";
import { createFurniture } from "../controllers/furniture/createFurniture.js";
import { fetchAllFurniture } from "../controllers/furniture/getAllFurniture.js";
import { getSingleFurnitureById } from "../controllers/furniture/getSingleFurnitureById.js";
import { updateFurniture } from "../controllers/furniture/updateFurniture.js";
import { deleteFurniture } from "../controllers/furniture/deleteFurniture.js";
import { authenticateUser, checkRole } from "../middlewares/authMiddleware.js";
//create an instance of express router
const router = express.Router();
//define furniture routes/endpoints
router.post(
  "/create-furniture",
  authenticateUser,
  checkRole("admin"),
  createFurniture
);
router.get("/all-furniture", fetchAllFurniture);
router.get("/furniture-details/:id", getSingleFurnitureById);
router.put(
  "/update-furniture/:id",
  authenticateUser,
  checkRole("admin"),
  updateFurniture
);
router.delete(
  "/delete-furniture/:id",
  authenticateUser,
  checkRole("admin"),
  deleteFurniture
);
//export the router
export default router;
