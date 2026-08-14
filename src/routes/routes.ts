import { Router } from "express";
import geoData from "../geoData/geoData.routes";
import { errorHandler } from "../shared/middlewares/ErrorHandler/errorHandler";
import { Response, Request } from "express";
import path from "path"

const router = Router()
router.use("/Geo", geoData)
router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.resolve(process.cwd(), "front", "index.html"))
})
router.use(errorHandler)

export default router