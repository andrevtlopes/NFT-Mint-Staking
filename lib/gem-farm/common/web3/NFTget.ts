import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';
import { programs } from '@metaplex/js';
import calculateRarity from 'lib/utils/calculateRariry';

const {
    metadata: { Metadata },
} = programs;

export interface INFT {
    pubkey?: PublicKey;
    mint: PublicKey;
    onchainMetadata: any;
    externalMetadata: any;
}

async function getTokensByOwner(owner: PublicKey, conn: Connection) {
    const tokens = await conn.getParsedTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
    });

    // initial filter - only tokens with 0 decimals & of which 1 is present in the wallet
    return tokens.value
        .filter((t) => {
            const amount = t.account.data.parsed.info.tokenAmount;
            return amount.decimals === 0 && amount.uiAmount === 1;
        })
        .map((t) => {
            return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint };
        });
}

async function getNFTMetadata(
    mint: string,
    conn: Connection,
    pubkey?: string
): Promise<INFT | undefined> {
    // console.log('Pulling metadata for:', mint);
    try {
        const metadataPDA = await Metadata.getPDA(mint);
        const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;
        const externalMetadata = (await axios.get(onchainMetadata.data.uri))
            .data;
        return {
            pubkey: pubkey ? new PublicKey(pubkey) : undefined,
            mint: new PublicKey(mint),
            onchainMetadata,
            externalMetadata,
        };
    } catch (e) {
        console.log(`failed to pull metadata for token ${mint}`);
    }
}

async function getNFTMetadataWithRarity(
    mint: string,
    conn: Connection,
    pubkey?: string
): Promise<INFT | undefined> {
    const metadata = await getNFTMetadata(mint, conn, pubkey);
    return {
        ...metadata,
        externalMetadata: {
            ...metadata.externalMetadata,
            rarity: calculateRarity(metadata.externalMetadata.attributes),
        },
    };
}

export async function getNFTMetadataForMany(
    tokens: any[],
    conn: Connection
): Promise<INFT[]> {
    const promises: Promise<INFT | undefined>[] = [];
    tokens.forEach((t) =>
        promises.push(getNFTMetadata(t.mint, conn, t.pubkey))
    );
    const nfts = (await Promise.all(promises)).filter((n) => !!n);
    console.log(`found ${nfts.length} metadatas`);

    return nfts as INFT[];
}

export async function getNFTMetadataWithRarityForMany(
    tokens: any[],
    conn: Connection
): Promise<INFT[]> {
    const promises: Promise<INFT | undefined>[] = [];
    tokens.forEach((t) =>
        promises.push(getNFTMetadataWithRarity(t.mint, conn, t.pubkey))
    );
    const nfts = (await Promise.all(promises)).filter((n) => !!n);
    console.log(`found ${nfts.length} metadatas with rarity`);

    return nfts as INFT[];
}

export async function getNFTsByOwner(
    owner: PublicKey,
    conn: Connection
): Promise<INFT[]> {
    const tokens = await getTokensByOwner(owner, conn);
    console.log(`found ${tokens.length} tokens`);

    return await getNFTMetadataForMany(tokens, conn);
}
