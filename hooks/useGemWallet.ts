import { useState } from 'react';
import useWalletNFTs, { NFT } from 'hooks/useWalletNFTs';
import { RARITY } from 'lib/utils/calculateRariry';

const useGemWallet = () => {
    const { walletNFTs, refetchNFTs } = useWalletNFTs([
        '3uHuS5FM8iSYi7d6XwdWAJBeyA65vqS79t3sbD6nsbyb',
    ]);

    const [selectedWalletItems, setSelectedWalletItems] = useState<NFT[]>([]);

    /**
     * Handles selected items.
     */
    const handleWalletItemClick = (item: NFT) => {
        setSelectedWalletItems((prev) => {
            const exists = prev.find(
                (NFT) =>
                    NFT.onChain.metaData.mint === item.onChain.metaData.mint
            );

            /** Remove if exists */
            if (exists) {
                return prev.filter(
                    (NFT) =>
                        NFT.onChain.metaData.mint !== item.onChain.metaData.mint
                );
            }

            return prev?.concat(item);
        });
    };

    const isEpicOrLegendaryOrMythic = selectedWalletItems.some(
        (nft) =>
            nft.offChain.rarity === RARITY.Epic ||
            nft.offChain.rarity === RARITY.Legendary || 
            nft.offChain.rarity === RARITY.Mythic
    );

    const isCommonOrUncommonOrRare = selectedWalletItems.some(
        (nft) =>
            nft.offChain.rarity === RARITY.Common ||
            nft.offChain.rarity === RARITY.Uncommon ||
            nft.offChain.rarity === RARITY.Rare
    );

    const canStakeSlime = !isEpicOrLegendaryOrMythic;
    const canStakePiece = isEpicOrLegendaryOrMythic && !isCommonOrUncommonOrRare;

    return {
        walletNFTs,
        refetchNFTs,
        selectedWalletItems,
        setSelectedWalletItems,
        canStakeSlime,
        canStakePiece,
        handleWalletItemClick,
    };
};

export default useGemWallet;
