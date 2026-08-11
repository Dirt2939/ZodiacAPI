import { Router } from "express";
import geoData from "../geoData/geoData.routes";

const router = Router()
router.use("/Geo", geoData)

export default router