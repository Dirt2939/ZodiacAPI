import { Router } from "express";
import geoData from "../geoData/geoData.routes";
import { errorHandler } from "../shared/middlewares/ErrorHandler/errorHandler";

const router = Router()
router.use("/Geo", geoData)
router.use(errorHandler)

export default router