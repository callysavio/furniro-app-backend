import express from "express";
import { createFurniture } from "../controllers/furniture/createFurniture.js";
import { fetchAllFurniture } from "../controllers/furniture/getAllFurniture.js";
//create an instance of express router
const router = express.Router();
router.post("/create-furniture", createFurniture);
router.get("/all-furniture", fetchAllFurniture);
//export the router
export default router;
