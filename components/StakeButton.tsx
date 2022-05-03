import { useFetch } from '@/hooks/useFetch';
import put from '@/lib/utils/put';
import { useConnection } from '@solana/wallet-adapter-react';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { Coin } from './StakeTab';
import { UnstakeCountdown } from './UnstakeCountdown';

type Props = {
    farm: any;
    coin: Coin;
    className?: string;
};

const StakeButton = ({ farm, coin, className }: Props) => {
    const [unstakeClick, setUnstakeClick] = useState(false);
    const [unstakeTs, setUnstakeTs] = useState(0);
    const [timeDiff, setTimeDiff] = useState(0);

    const {
        wallet,
        farmerAccount,
        farmerStatus,
        handleStakeButtonClick,
        handleUnstakeButtonClick,
        setFeedbackStatus,
        farmerVaultNFTs,
    } = farm;

    const { data } = useFetch(
        `/api/stake/fetch?id=${wallet?.publicKey.toBase58()}`
    );
    const { connection } = useConnection();

    const daysList = useMemo(
        () => (coin === Coin.Slime ? [7, 14, 30, 60] : [30, 60]),
        [coin]
    );

    const coinTs = useMemo(() => coin?.toLowerCase() + 'Ts', [coin]);

    useEffect(() => {
        connection
            .getSlot()
            .then((slot) =>
                connection
                    .getBlockTime(slot)
                    .then((time) => setTimeDiff(Date.now() - time * 1000))
            );
    }, [connection]);

    useEffect(() => {
        setUnstakeClick(false);
    }, [farmerStatus]);

    useEffect(() => {
        setUnstakeTs(data?.[coinTs] ?? farmerAccount.minStakingEndsTs);
    }, [data, coinTs, farmerAccount.minStakingEndsTs]);

    const classStr = classNames(
        'btn btn-sm btn-secondary btn-stake',
        className
    );

    const handleStakeButtonClicked = async (days: number) => {
        try {
            handleStakeButtonClick();

            const data = await put('/api/stake/create', {
                publicKey: wallet?.publicKey.toBase58(),
                days,
                coin,
            });

            setUnstakeTs(data?.[coinTs]);
        } catch (e: any) {
            console.log(e);
        }
    };

    const handleUnstakeButtonClicked = () => {
        if (unstakeClick) {
            return handleUnstakeButtonClick();
        } else {
            setFeedbackStatus("You can't unstake now");
            setTimeout(() => {
                setFeedbackStatus('');
            }, 2000);
        }
    };

    return (
        <>
            <button
                key={farmerStatus}
                className={
                    classStr +
                    (timeDiff === 0 ? ' loading' : '')
                }
                onClick={handleUnstakeButtonClicked}
                disabled={
                    !(
                        farmerStatus === 'staked' ||
                        farmerStatus === 'pendingCooldown'
                    )
                }
            >
                {!unstakeClick
                    ? timeDiff !== 0 && (
                          <UnstakeCountdown
                                key={farmerStatus}
                              status={farmerStatus}
                              date={
                                  farmerStatus === 'pendingCooldown'
                                      ? farmerAccount.cooldownEndsTs * 1000
                                      : unstakeTs
                              }
                              onMount={() => setUnstakeClick(true)}
                              onComplete={() => setUnstakeClick(true)}
                              onStart={() => setUnstakeClick(false)}
                              now={() => Date.now() - timeDiff}
                          />
                      )
                    : farmerStatus === 'pendingCooldown'
                    ? 'End cooldown'
                    : 'Unstake'}
            </button>
            {farmerStatus === 'unstaked' && farmerVaultNFTs?.length && (
                <div className='dropdown dropdown-hover'>
                    <label
                        tabIndex={0}
                        className={classStr}
                    >
                        Stake
                    </label>
                    <ul
                        tabIndex={0}
                        className='p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52'
                    >
                        {daysList?.map((days, idx) => (
                            <li key={idx}>
                                <a
                                    onClick={() =>
                                        handleStakeButtonClicked(days)
                                    }
                                >
                                    {days} Days
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default StakeButton;
