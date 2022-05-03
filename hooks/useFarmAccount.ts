import { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { GemFarm, initGemFarm } from 'lib/gem-farm/common/gem-farm';

const useFarmAccount = (farmId: string) => {
    const { connection } = useConnection();

    const [farmAccount, setFarmAccount] = useState<any>(null); // @TODO add type to farmAccount
    const [gemFarmClient, setGemFarmClient] = useState<GemFarm | null>(null);

    /**
     * Init clients, farm and farmer account on mount
     */
    useEffect(() => {
        (async () => {
            if (connection) {
                try {
                    if (!farmId) throw 'No farm ID has been configured.';

                    console.log('[Farm Hook] Initializing client...');
                    // const bankClient = await initGemBank(connection, wallet);
                    // setGemBankClient(bankClient);

                    const farmClient = await initGemFarm(connection);
                    setGemFarmClient(farmClient);

                    const farmAcc = await farmClient.fetchFarmAcc(
                        new PublicKey(farmId)
                    );
                    setFarmAccount(farmAcc as any);
                } catch (e) {
                    setFarmAccount(null);
                    console.error(e);
                }
            }
        })();
    }, [connection, farmId]);

    return farmAccount;
};

export default useFarmAccount;