const VaultButton = ({ farm, wallet, coin }) => {
    return farm.farmerAccount && !farm.farmerAccount?.identity ? (
        <button className='btn btn-accent' onClick={farm?.handleInitStakingButtonClick}>
            Initialize ${coin} Staking
        </button>
    ) : wallet.selectedWalletItems?.length && !farm.isLocked ? (
        <button
            className='btn btn-accent'
            onClick={() => farm?.handleMoveToVaultButtonClick(wallet)}
        >
            Deposit selected to earn ${coin}
        </button>
    ) : null;
};

export default VaultButton;
