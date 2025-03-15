import express from "express";
import { fetchCustomizedPackage, saveCustomizedPackage } from "../controllers/customizedPackageController.js";

const router = express.Router();

// ✅ Fetch customized package details
router.get("/details/:user_id/:city_id", fetchCustomizedPackage);
router.get("/details/:custom_package_id", fetchCustomizedPackage);

// ✅ Save or update a customized package
router.post("/add/:user_id/:city_id", saveCustomizedPackage);

export default router;
