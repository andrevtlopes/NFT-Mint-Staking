/** @jsxImportSource theme-ui */
import Link from 'next/link';
import { useRouter } from 'next/router';

import WalletManager from '@/components/WalletManager/WalletManager';
import { useState } from 'react';
import { CloseIcon, MenuIcon } from '../icons';
import classNames from 'classnames';
import Image from 'next/image';

const Header = () => {
    const { pathname } = useRouter();
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

    const navClass = classNames([
        'flex md:justify-between flex-col-reverse',
        isMobileMenuActive ? 'bg-accent' : 'w-full',
    ]);

    return (
        <div className='sticky top-0 z-50 flex rounded-b-lg shadow-xl lg:mx-4 backdrop-blur-xl backdrop-saturate-150'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between p-3'>
                    {/* <Link href='/' passHref>
                        <a className='flex flex-col items-center'>
                            <div className='flex items-center'>
                                <h1 className='ml-2 heading-special'>
                                    SLIMERING
                                </h1>

                                <img
                                    sx={{
                                        maxHeight: '4.8rem',
                                        opacity: '0',
                                    }}
                                    src='/images/gemtransparent.gif'
                                    alt='Gemworks'
                                />

                                <span
                                    variant='headingSpecial'
                                    ml='.4rem'
                                >
                                    FARM
                                </span>
                            </div>
                            <span
                                sx={{
                                    display: 'block',
                                }}
                                variant='small'
                            >
                                by Gemworks
                            </span>
                        </a>
                    </Link> */}
                    {/* <span className='mr-auto primary-info'>
                        &nbsp;&nbsp;&nbsp;&#8226;&nbsp;
                        {process.env.NEXT_PUBLIC_CONNECTION_NETWORK}
                    </span> */}

                    <nav
                        className={navClass}
                        sx={{
                            gap: '1.6rem',
                            display: 'none',
                            alignItems: 'center',

                            /** Mobile styles when the menu is active */
                            ...(isMobileMenuActive && {
                                display: 'flex',
                                position: 'fixed',
                                alignItems: 'center',
                                top: '0',
                                left: '0',
                                width: '100vw',
                                height: '100vh',
                                padding: '1.6rem',
                                transition:
                                    'opacity 0.125s cubic-bezier(0.175, 0.885, 0.32, 1.275),visibility 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                zIndex: 99,

                                '& > a': {
                                    marginBottom: '.8rem',
                                },

                                '&.active': {
                                    visibility: 'visible',
                                    opacity: 1,
                                },
                            }),

                            /** Desktop styles (reset mobile) */
                            '@media (min-width: 768px)': {
                                display: 'flex',
                                flexDirection: 'row',
                                height: 'auto',
                                padding: 0,
                                position: 'relative',
                            },
                        }}
                    >
                        <button
                            className='flex p-3 flex-end hover:bg-transparent'
                            sx={{
                                ...(!isMobileMenuActive && { display: 'none' }),
                            }}
                            onClick={() => setIsMobileMenuActive(false)}
                        >
                            <CloseIcon className='transition-colors stroke-accent-content hover:stroke-accent-focus' />
                        </button>
                        <div className='flex flex-col gap-6 text-2xl transition-transform heading-special md:flex-row'>
                            <Link href='/'><a className='hover:scale-110'>Home</a></Link>
                            <Link href='stake'><a className='hover:scale-110'>Stake</a></Link>
                        </div>
                        {pathname !== '/stake' ? (
                            <div className='flex justify-center gap-4'>
                                {/* <div className='flex gap-4 align-center p-[70px] pt-[64px] pb-[182px] mt-[-58px] mr-[-42px] mb-[-150px]'
                            style={{
                                backgroundSize: '100px 100px',
                                background: 'url(images/dripping.svg)',
                            }}
                        > */}
                                <a
                                    href='https://twitter.com/FunguyzNFT'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center w-10 hover:scale-110'
                                >
                                    <Image
                                        height={30}
                                        width={30}
                                        src='/images/twitter.svg'
                                        alt='twitter icon'
                                    />
                                </a>
                                <a
                                    href='https://twitter.com/FunguyzNFT'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='flex items-center w-10 hover:scale-110'
                                >
                                    <Image
                                        height={30}
                                        width={30}
                                        src='/images/discord.svg'
                                        alt='discord icon'
                                    />
                                </a>
                                {/* </div> */}
                            </div>
                        ) : (
                            <WalletManager />
                        )}
                    </nav>
                    <button
                        className='p-3 md:hidden'
                        onClick={() => setIsMobileMenuActive(true)}
                    >
                        <MenuIcon className='transition-colors stroke-primary-content hover:stroke-primary-focus' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
