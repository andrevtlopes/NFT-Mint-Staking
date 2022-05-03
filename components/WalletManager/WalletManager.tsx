import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { SettingsIcon } from '../icons';

const WalletManager = () => {
    const wallet = useWallet();

    return (
        <div className='flex'>
             <div className='flex'>
                {wallet?.publicKey ? (
                    <WalletMultiButton
                        className='self-end gap-1 btn btn-primary btn-sm'
                        startIcon={null as any}
                    >
                        <SettingsIcon className='stroke-primary-content' />
                        <span className='info-primary'>
                            {wallet?.publicKey.toBase58().slice(0, 5)}...
                        </span>
                    </WalletMultiButton>
                ) : (
                    <WalletMultiButton
                        className='btn btn-primary btn-sm'
                        startIcon={null as any}
                    ></WalletMultiButton>
                )}
            </div>
        </div>
    );
};

export default WalletManager;
