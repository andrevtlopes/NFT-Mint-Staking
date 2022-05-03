import connectToDatabase from '@/config/connectToDatabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function create(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { publicKey, days, coin } = req.body;
    const minStakingEndsTs = Date.now() + 60 * 60 * 24 * days * 1000;

    if (!publicKey) {
        return res.status(500).json({ error: 'Public Key is not set' });
    }

    if (!days) {
        return res.status(500).json({ error: 'Days is not set' });
    }

    let slimeTs = 0;
    let pieceTs = 0;

    if (coin?.toLowerCase() === 'slime') {
        slimeTs = minStakingEndsTs;
    } else if (coin?.toLowerCase() === 'piece') {
        pieceTs = minStakingEndsTs;
    } else {
        return res.status(500).json({ error: 'Coin is not set or is wrong' });
    }

    const { db, data } = await connectToDatabase();

    const userTs = data.get('userTs').find({ publicKey }).value();

    if (!userTs) {
        db.data.userTs.push({ publicKey, slimeTs, pieceTs });
        await db.write();
        return res.status(200).json(data.get('userTs').find({ publicKey }).value());
    } else {
        let ret = {};
        if (coin?.toLowerCase() === 'slime' && userTs?.slimeTs < slimeTs) {
            ret = data.get('userTs').find({ publicKey }).assign({ slimeTs }).value();
        } else if (userTs?.pieceTs < pieceTs) {
            ret = data.get('userTs').find({ publicKey }).assign({ pieceTs }).value();
        } else {
            return res.status(500).json({ error: 'User is already set' });
        }

        await db.write();
        return res.status(200).json(ret);
    }
}
