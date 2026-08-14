import { Router, Request, Response } from 'express';
import validator from '../shared/middlewares/validator';
import { user } from './geoData.schema';
import * as controller from './geoData.controller'
import geoip from 'geoip-lite'

const geoData = Router();

geoData.post("/", validator({ body: user }), controller.search);

geoData.get("/", (req: Request, res: Response) => {
    const forwarded = req.headers["x-forwarded-for"];
    const rawIp = Array.isArray(forwarded)
        ? forwarded[0]
        : typeof forwarded === "string"
            ? forwarded.split(",")[0].trim()
            : req.socket.remoteAddress ?? "";

    const ip = rawIp.startsWith("::ffff:")
        ? rawIp.replace("::ffff:", "")
        : rawIp;

    const geo = geoip.lookup(ip);
    console.log(geo)

    res.status(200).json({
        country: geo?.country ?? null,
        ip,
    })
})

export default geoData;