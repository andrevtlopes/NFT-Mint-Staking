/** @jsxImportSource theme-ui */
import { Flex, Spinner } from 'theme-ui';
import CollectionItem from './CollectionItem/CollectionItem';
import VaultButton from './VaultButton';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletTab = ({ gemWallet, isLocked, farmSlime, farmPiece }) => {
    const { publicKey } = useWallet();

    return gemWallet.walletNFTs ? (
        gemWallet.walletNFTs.length ? (
            <div className='flex flex-col items-center'>
                <div className='grid items-center grid-cols-2 gap-6 md:grid-cols-5'>
                    {gemWallet.walletNFTs.map((item) => {
                        const isSelected = gemWallet.selectedWalletItems.find(
                            (NFT) =>
                                NFT.onChain.metaData.mint ===
                                item.onChain.metaData.mint
                        );

                        return (
                            <CollectionItem
                                className='max-w-[12rem]'
                                isSelected={isSelected}
                                key={item.onChain.metaData.mint}
                                item={item}
                                onClick={
                                    !isLocked
                                        ? gemWallet.handleWalletItemClick
                                        : () => true
                                }
                            />
                        );
                    })}
                </div>
                <div className='flex flex-row items-center h-12 mt-4'>
                    {gemWallet.selectedWalletItems.length ? (
                        <>
                            {gemWallet.canStakeSlime && (
                                <VaultButton
                                    farm={farmSlime}
                                    wallet={gemWallet}
                                    coin='SLIME'
                                />
                            )}
                            {gemWallet.canStakePiece && (
                                <VaultButton
                                    farm={farmPiece}
                                    wallet={gemWallet}
                                    coin='PIECE'
                                />
                            )}
                            {(!gemWallet.canStakeSlime &&
                                !gemWallet.canStakePiece) && (
                                    <span className='info-primary'>
                                        Select only NFTs of the same type of
                                        staking.
                                    </span>
                                )}
                        </>
                    ) : gemWallet.walletNFTs.length && !isLocked ? (
                        <span className='info-primary'>
                            Select NFTs to move them to your Vault.
                        </span>
                    ) : null}
                </div>
            </div>
        ) : (
            /** walletNFTs fetched but array is empty, means current wallet has no NFT. */
            <div className='flex self-stretch justify-center'>
                <span className='info-primary'>There are no Slimerings NFTs on your wallet.</span>
            </div>
        )
    ) : /** No walletNFTs and public key, means it is loading */
    publicKey ? (
        <div className='flex self-stretch justify-center'>
            <Spinner variant='styles.spinnerLarge' className='stroke-primary-content' />
        </div>
    ) : null;
};

export default WalletTab;
