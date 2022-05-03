import React from 'react';
import * as anchor from '@project-serum/anchor';
import Mint from '@/components/Mint/Mint';
import {
    connection,
    rpcHost,
} from '@/components/WalletProvider/WalletProvider';
import useFarmAccount from 'hooks/useFarmAccount';
import { BN } from '@project-serum/anchor';

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
    try {
        const candyMachineId = new anchor.web3.PublicKey(
            process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!
        );

        return candyMachineId;
    } catch (e) {
        console.log('Failed to construct CandyMachineId', e);
        return undefined;
    }
};

const candyMachineId = getCandyMachineId();

const txTimeoutInMilliseconds = 30000;

const StakeNumber = ({ value }) => {
    const str = value.toString().padStart(4, '0');
    return <>
        {[...str].map((s, idx) => (
            <div key={idx} className='stake-number'>
                {s}
            </div>
        ))}
    </>
};

const HomePage = () => {
    const farmSlime = useFarmAccount(
        process.env.NEXT_PUBLIC_GEMFARM_ID_SLIME || ''
    );

    console.log(farmSlime)
    const farmPiece = useFarmAccount(
        process.env.NEXT_PUBLIC_GEMFARM_ID_PIECE || ''
    );
    const gemsStaked = (farmSlime?.gemsStaked as BN)?.toNumber() + (farmPiece?.gemsStaked as BN)?.toNumber();
    const stakedPercentage = gemsStaked / 30;

    return (
        <div className=''>
            <div className='pt-20 -mt-20 bg-purple-300 hero'>
                <div className='flex-col max-w-screen-lg hero-content lg:flex-row-reverse'>
                    <div className='w-[400px]'>
                        {/* <div className='w-[400px] border mockup-window bg-base-300'>
                            <div className='flex justify-center px-4 py-16 bg-base-200'>
                                Hello!
                            </div>
                        </div> */}
                        <div className='w-[400px] h-[430px] bg-gray-50 rounded-lg flex justify-center items-center'>
                            Image
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 p-4'>
                        <div className='card'>
                            <div className='mx-auto text-6xl card-title text-rose-400'>
                                Slimering
                            </div>
                            <div className='flex gap-2 card-body bg-[#ABDEE6]'>
                                <p>Something to introduce our collection</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. In egestas vestibulum
                                    sollicitudin. Maecenas pellentesque laoreet
                                    erat, ac blandit sem congue quis. Donec non
                                    consectetur nibh, et tempus sem. Sed congue
                                    nunc laoreet, imperdiet ipsum eu, luctus
                                    dui. Ut elementum, orci a hendrerit
                                    suscipit, justo urna facilisis metus, ac
                                    sollicitudin erat.
                                </p>
                                <p>
                                    <p>Supply: 3000</p>
                                    <p>Price: 1 SOL</p>
                                </p>
                            </div>
                            {/* <button className="btn btn-secondary">Get Started</button> */}
                        </div>
                        <div className='card'>
                            <div className='mx-auto text-3xl text-green-200 card-title'>
                                {stakedPercentage?.toFixed(2)} % Slimerings
                                Staked!
                            </div>
                            <div className='grid grid-cols-4 gap-2 px-6 py-4 bg-green-300 card-body'>
                                <StakeNumber value={gemsStaked} />
                            </div>
                            {/* <button className="btn btn-secondary">Get Started</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-6 py-6 text-center bg-indigo-200'>
                {/* <div>
                    <img src='logo.png' alt='logo' className='logo' />
                    <img
                        src='slimerings.gif'
                        alt='slimerings'
                        className='slimerings'
                    />
                </div> */}
                <h2 className='mx-auto text-5xl text-white shadow-special'>
                    Mint some Slimerings!
                </h2>

                <Mint
                    candyMachineId={candyMachineId}
                    connection={connection}
                    txTimeout={txTimeoutInMilliseconds}
                    rpcHost={rpcHost}
                />
            </div>
            <div className='bg-[#F3B0C3]'>
                <div className='container grid max-w-screen-lg grid-cols-10 gap-6 px-4 py-6 mx-auto'>
                    <div className='grid grid-cols-2 col-span-10 gap-4 md:col-span-4'>
                        <div className='h-40 bg-white rounded-lg' />
                        <div className='h-40 bg-white rounded-lg' />
                        <div className='h-40 bg-white rounded-lg' />
                        <div className='h-40 bg-white rounded-lg' />
                    </div>
                    <div className='flex flex-col col-span-10 gap-6 md:col-span-6'>
                        <h2 className='text-5xl text-white shadow-special'>
                            The Collection
                        </h2>
                        <p className='text-lg'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. In egestas vestibulum sollicitudin. Maecenas
                            pellentesque laoreet erat, ac blandit sem congue
                            quis. Donec non consectetur nibh, et tempus sem. Sed
                            congue nunc laoreet, imperdiet ipsum eu, luctus dui.
                            Ut elementum, orci a hendrerit suscipit, justo urna
                            facilisis metus, ac sollicitudin erat.
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-amber-300'>
                <div className='flex flex-col max-w-screen-lg gap-6 py-6 mx-auto'>
                    <h2 className='mx-auto text-5xl text-white shadow-special'>
                        The Team
                    </h2>
                    <div className='grid items-center grid-cols-4 gap-4'>
                        <div className='flex flex-col gap-4 justify-self-center'>
                            <h3 className='text-2xl text-center'>Person #1</h3>
                            <div className='w-40 h-40 bg-white rounded-full' />
                            <h3 className='text-2xl text-center'>
                                web3 developer
                            </h3>
                        </div>
                        <div className='flex flex-col gap-4 justify-self-center'>
                            <h3 className='text-2xl text-center'>Person #2</h3>
                            <div className='w-40 h-40 bg-white rounded-full' />
                            <h3 className='text-2xl text-center'>the artist</h3>
                        </div>
                        <div className='flex flex-col gap-4 justify-self-center'>
                            <h3 className='text-2xl text-center'>Person #3</h3>
                            <div className='w-40 h-40 bg-white rounded-full' />
                            <h3 className='text-2xl text-center'>
                            Developer
                            </h3>
                        </div>
                        <div className='flex flex-col gap-4 justify-self-center'>
                            <h3 className='text-2xl text-center'>Person #4</h3>
                            <div className='w-40 h-40 bg-white rounded-full' />
                            <h3 className='text-2xl text-center'>community manager</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
