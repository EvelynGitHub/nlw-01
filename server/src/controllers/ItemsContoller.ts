import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(item => {
            return { 
                title: item.title,
                id: item.id,
                image_url: `http://192.168.0.112:3333/uploads/${item.image}`,
            };
        });  
    
        return response.json(serializedItems);
    }
}

export default ItemsController