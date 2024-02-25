import express from "express"
import { categoryControlller,
     createCategoryController, 
     deleteCategoryCOntroller, 
     singleCategoryController, 
     updateCategoryController 
    } from "../controllers/categoryConroller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//create category
router.post("/create-category", requireSignIn,isAdmin,  createCategoryController)
//update category
router.put("/update-category/:id",requireSignIn, isAdmin, updateCategoryController)
//get all category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id",deleteCategoryCOntroller);
export default router