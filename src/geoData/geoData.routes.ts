import { Router, Request, Response } from 'express';
import validator from '../shared/middlewares/validator';
import { test } from './geoData.schema';

const geoData = Router();

geoData.post("/", validator({ body: test }), (req: Request, res: Response) => {
    res.status(200).json({ status: "success", message: "Geo route ok" });
});

export default geoData;