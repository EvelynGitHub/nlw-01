import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async show(request: Request, response: Response) {
        // const id = request.params.id;
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ mensagem: 'Point not found.'});
        }

        const serializedPoint = {            
            ...point,
            image_url: `http://192.168.0.112:3333/uploads/${point.image}`,
            
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        

        return response.json({ serializedPoint, items });
    }

    async create (request: Request, response: Response){ 
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // TRX FICA NO LUGAR DE KNEX PARA IMPEDIR QUE O PRIMEIRO INSERT EXECUTE CASO O SEGUNDO FALHE 
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            };
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point,
        });
    }

    async index(request: Request, response: Response) {
        // cidade, uf, items (Query Params)
        const { city, uf, items } = request.query;

        const parseItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parseItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.112:3333/uploads/${point.image}`,
            }
        })

        return response.json(serializedPoints);
    }
}

export default PointsController