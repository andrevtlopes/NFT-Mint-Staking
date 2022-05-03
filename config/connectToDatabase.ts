import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import lodash from 'lodash';

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

export type UserTimestamps = {
    pieceTs?: number;
    slimeTs?: number;
    publicKey: string;
}

type Data = {
    userTs: UserTimestamps[];
}

export default async function connectToDatabase() {

    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Use JSON file for storage
    const file = join(__dirname, 'db.json');

    const adapter = new JSONFile<Data>(file);
    const db = new LowWithLodash(adapter);

    // Read data from JSON file, this will set db.data content
    await db.read();

    db.data ||= { userTs: [] };

    await db.write();

    const data = db.chain;

    return { db, data };
}