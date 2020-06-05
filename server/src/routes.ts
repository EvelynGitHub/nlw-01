import express, { response } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsConctroller from './controllers/ItemsContoller';

// index, show, create, update, delete

const routers = express.Router();
const upload = multer(multerConfig);

const pc = new PointsController();
const ic = new ItemsConctroller();

routers.get('/items', ic.index);
routers.get('/points/:id', pc.show);
routers.get('/points', pc.index);

routers.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    pc.create
);

export default routers;

// Service Pattern
// Repository Pattern (Data Mapper)