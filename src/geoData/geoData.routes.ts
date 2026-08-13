import { Router, Request, Response } from 'express';
import validator from '../shared/middlewares/validator';
import { user } from './geoData.schema';
import * as controller from './geoData.controller'

const geoData = Router();

geoData.post("/", validator({ body: user }), controller.search);

export default geoData;