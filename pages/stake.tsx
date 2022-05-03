import useGemFarmStaking from 'hooks/useGemFarmStaking';
import { useWallet } from '@solana/wallet-adapter-react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import StakeTab, { Coin } from '@/components/StakeTab';
import useGemWallet from 'hooks/useGemWallet';
import WalletTab from '@/components/WalletTab';

const StakePage = () => {
    const [isLocked, setIsLocked] = useState(true);

    const farmSlime = useGemFarmStaking(
        process.env.NEXT_PUBLIC_GEMFARM_ID_SLIME || ''
    );
    const farmPiece = useGemFarmStaking(
        process.env.NEXT_PUBLIC_GEMFARM_ID_PIECE || ''
    );

    useEffect(() => {
        setIsLocked(farmSlime.isLocked && farmPiece.isLocked);
    }, [farmSlime.isLocked, farmPiece.isLocked]);

    const wallet = useGemWallet();

    const { publicKey } = useWallet();

    return (
        <div className='container relative flex-col items-center max-w-screen-lg px-2 py-6 mx-auto mt-4 text-center'>
            {/* <Heading>Your staking account</Heading>
        <Text>Below you can stake, unstake and collect rewards.</Text> */}

            {!publicKey ? (
                /** Render nothing if there is no wallet connected. */
                <span className='text-center info-primary'>
                    Connect your wallet first.
                </span>
            ) : (
                <Tabs
                    className='self-stretch'
                    selectedTabClassName='tab-active'
                >
                    <TabList className='tabs'>
                        <Tab className='tab tab-lifted tab-md tab-border-none'>
                            Your wallet
                        </Tab>
                        <Tab
                            className='tab tab-lifted tab-md tab-border-none'
                            disabled={!farmSlime?.farmerAccount?.identity}
                        >
                            Earn $SLIME
                        </Tab>
                        <Tab
                            className='tab tab-lifted tab-md tab-border-none'
                            disabled={!farmPiece?.farmerAccount?.identity}
                        >
                            Earn $PIECE
                        </Tab>
                    </TabList>

                    <TabPanel className='rounded-tl-none rounded-xl tab-panel'>
                        <WalletTab
                            gemWallet={wallet}
                            isLocked={isLocked}
                            farmSlime={farmSlime}
                            farmPiece={farmPiece}
                        />
                    </TabPanel>
                    <TabPanel className='rounded-xl tab-panel'>
                        <StakeTab farm={farmSlime} gemWallet={wallet} coin={Coin.Slime} />
                    </TabPanel>
                    <TabPanel className='rounded-xl tab-panel'>
                        <StakeTab farm={farmPiece} gemWallet={wallet} coin={Coin.Piece} />
                    </TabPanel>
                </Tabs>
            )}
        </div>
    );
};

export default StakePage;
