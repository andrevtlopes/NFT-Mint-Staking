/** @jsxImportSource theme-ui */
import { Spinner } from 'theme-ui';
import * as anchor from '@project-serum/anchor';
import CollectionItem from '@/components/CollectionItem/CollectionItem';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LoadingIcon } from './icons/LoadingIcon';
import classNames from 'classnames';
import { UnstakeCountdown } from './UnstakeCountdown';
import { useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { usePut } from '@/hooks/usePut';
import put from '@/lib/utils/put';
import StakeButton from './StakeButton';

export enum Coin {
    Slime = 'SLIME',
    Piece = 'PIECE',
}

type Props = {
    farm: any;
    gemWallet: any;
    coin: Coin;
    className?: string;
};

const StakeTab = ({ farm, gemWallet, coin, className }: Props) => {
    const [unstakeClick, setUnstakeClick] = useState(false);
    const [timeDiff, setTimeDiff] = useState(0);
    const [unstakeTs, setUnstakeTs] = useState(0);
    const {
        farmerVaultAccount,
        farmerStatus,
        isLocked,
        availableA,
        feedbackStatus,
        handleClaimButtonClick,
        farmerVaultNFTs,
        selectedVaultItems,
        handleMoveToWalletButtonClick,
        handleVaultItemClick,
        handleRefreshRewardsButtonClick,
    } = farm;

    const { publicKey } = useWallet();
    
    const classStr = classNames(
        'flex flex-col relative transition-all outline-none items-center',
        className
    );

    return farmerVaultAccount ? (
        <div className={classStr}>
            <div className='flex flex-row flex-wrap items-center self-stretch justify-center gap-3 mb-8 md:mb-3'>
                <StakeButton farm={farm} coin={coin} />
                <button
                    className='mb-2 btn btn-sm btn-secondary'
                    onClick={handleClaimButtonClick}
                    disabled={!Number(availableA)}
                >
                    Claim&nbsp;
                    {/* <img
                            // sx={{
                            //     margin: '0 .4rem 0 .8rem',
                            //     maxHeight: '2.4rem',
                            // }}
                            src='images/icon-list-item.png'
                        /> */}
                    {availableA ? (
                        <b>{(availableA / 1000000000).toFixed(2)}</b>
                    ) : (
                        0
                    )}
                </button>
                <button
                    className='btn btn-sm btn-secondary btn-stake'
                    onClick={handleRefreshRewardsButtonClick}
                >
                    Refresh
                </button>
                {feedbackStatus && (
                    <div className='absolute flex flex-row items-center gap-2 shadow-lg alert md:w-auto md:-top-4 md:-right-4 -top-2'>
                        <>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                className='flex-shrink-0 w-6 h-6 stroke-info'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                ></path>
                            </svg>
                            <span className='info-primary'>
                                {feedbackStatus}
                            </span>
                            <LoadingIcon
                                className='stroke-primary-content'
                                size='1.6rem'
                            />
                        </>
                    </div>
                )}
            </div>
            {/* </Flex> */}
            {farmerVaultNFTs ? (
                farmerVaultNFTs.length ? (
                    <div className='flex flex-col items-center self-stretch justify-center'>
                        <div className='grid items-center grid-cols-2 gap-6 md:grid-cols-5'>
                            {farmerVaultNFTs.map((item) => {
                                const isSelected = selectedVaultItems.find(
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
                                                ? handleVaultItemClick
                                                : null
                                        }
                                    />
                                );
                            })}
                        </div>
                        <div className='flex flex-row items-center h-12 mt-4'>
                            {isLocked ? (
                                <span className='info-primary'>
                                    Stake Locked
                                </span>
                            ) : (
                                <>
                                    {!selectedVaultItems?.length &&
                                    farmerVaultNFTs?.length &&
                                    !isLocked ? (
                                        <span className='info-primary'>
                                            Select NFTs to withdraw them to your
                                            wallet.
                                        </span>
                                    ) : null}

                                    {selectedVaultItems &&
                                    selectedVaultItems.length ? (
                                        <>
                                            {!isLocked ? (
                                                <button
                                                    className='btn btn-accent'
                                                    onClick={() =>
                                                        handleMoveToWalletButtonClick(
                                                            gemWallet
                                                        )
                                                    }
                                                >
                                                    Withdraw selected
                                                </button>
                                            ) : null}
                                        </>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    /** vaultNFTs fetched but array is empty, means current wallet has no NFT. */
                    <div className='flex self-stretch justify-center'>
                        <span className='info-primary'>
                            There are no NFTs on your vault.
                        </span>
                    </div>
                )
            ) : /** No vaultNFTs and public key, means it is loading */
            publicKey ? (
                <div className='flex self-stretch justify-center'>
                    <Spinner variant='styles.spinnerLarge' />
                </div>
            ) : null}
        </div>
    ) : null;
};

export default StakeTab;
