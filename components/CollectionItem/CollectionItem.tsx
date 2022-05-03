/** @jsxImportSource theme-ui */
import React from 'react';

import { DotsIcon } from '@/components/icons/';
import { NFT } from 'hooks/useWalletNFTs';
import classNames from 'classnames';
import { RARITY_COLOR } from 'lib/utils/calculateRariry';

type Props = {
    item: NFT;
    additionalOptions?: React.ReactElement;
    onClick?: (item: NFT) => void;
    isSelected?: boolean;
    className?: string;
};

const CollectionItem = (props: Props) => {
    const { item, additionalOptions = null, className, onClick, isSelected } = props;

    if (!item) return null;

    const { onChain, offChain } = item;

    const handleOnClick = (item: NFT) => () => onClick ? onClick(item) : true;
    const handleKeyDown =
        (item: NFT) => (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (onClick && e.keyCode == 13) {
                onClick(item);
            }

            return true;
        };

    const classStr = classNames(
        'flex flex-col relative transition-all outline-none items-center collection-item',
        onClick ? 'cursor-pointer' : 'cursor-auto',
        isSelected && 'collection-item--selected',
        className
    );

    const imgClassNames = classNames(
        'transition-all rounded-md',
        onClick && 'hover:opacity-80'
    );

    return (
        <div
            tabIndex={1}
            className={classStr}
            onClick={handleOnClick(item)}
            onKeyDown={handleKeyDown(item)}
        >
            <div className='absolute z-10 w-full text-left top-1 left-1'>
                <div
                    className='text-black border-white badge'
                    // sx={{ backgroundImage: `linear-gradient(${RARITY_COLOR[item.offChain.rarity]}, transparent)` }}
                    sx={{ backgroundColor: RARITY_COLOR[item.offChain.rarity] }}
                >
                    {item.offChain.rarity}
                </div>
            </div>
            <div className='absolute z-20 dropdown top-2 right-2'>
                <label tabIndex={0} className='cursor-pointer'>
                    <DotsIcon className='w-8 h-8 stroke-2 stroke-white hover:opacity-70' />
                </label>
                <ul
                    tabIndex={0}
                    className='z-20 w-40 p-2 shadow dropdown-content menu bg-base-100 rounded-box'
                >
                    <li>
                        <a
                            href={onChain.metaData.data.uri}
                            rel='noopener noreferrer'
                            target='_blank'
                            tabIndex={1}
                        >
                            View raw JSON
                        </a>
                    </li>
                    <li>
                        <a
                            className='decoration-transparent'
                            href={offChain.image}
                            rel='noopener noreferrer'
                            target='_blank'
                            tabIndex={1}
                        >
                            View image
                        </a>
                    </li>
                    {additionalOptions || null}
                </ul>
            </div>
            <img className={imgClassNames} src={offChain.image} />
            <div className='mt-2 overflow-hidden badge text-ellipsis whitespace-nowrap badge-accent'>
                {offChain.name}
            </div>
        </div>
    );
};

export default CollectionItem;
