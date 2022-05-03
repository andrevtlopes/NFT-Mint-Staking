export const RARITY = {
    Common: 'Common',
    Uncommon: 'Uncommon',
    Rare: 'Rare',
    Epic: 'Epic',
    Legendary: 'Legendary',
    Mythic: 'Mythic',
};

export const RARITY_COLOR = {
    Common: '#fff',
    Uncommon: '#cce2cb',
    Rare: '#abdee6',
    Epic: '#f3b0c3',
    Legendary: '#ffccb6',
    Mythic: '#cbaacb',
};

export default function calculateRarity(attributes: any) {
    if (attributes[3]?.value === '6') {
        return RARITY.Legendary;
    }
    if (attributes[3]?.value === '7') {
        return RARITY.Mythic;
    }
    if (attributes[3]?.value === '9') {
        return RARITY.Common;
    }
    
}