import connectToDatabase from '@/config/connectToDatabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
    const publicKey = req.query.id as string; 
    
    if(!publicKey) return res.json("Página não encontrada!")
  
    const { data } = await connectToDatabase();
  
    const userTs = data.get('userTs').find({ publicKey }).value();

    return res.status(200).json(userTs);
}