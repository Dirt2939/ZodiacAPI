import { Request, Response } from "express";
import * as service from "./geoData.service"

export const search = async (req: Request, res: Response) => {
    const city = req.body.city
    const date = req.body.date

    const result = await service.searchCity(city, date)

    return res.status(200).json(result)
}