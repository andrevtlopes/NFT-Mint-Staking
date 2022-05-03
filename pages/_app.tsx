import React from 'react';
import { ThemeProvider } from 'theme-ui';
import {
    ThemeProvider as MaterialThemeProvider,
    createTheme,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import Router, { AppProps } from 'next/dist/shared/lib/router/router';
import dynamic from 'next/dynamic';

// import "nprogress/nprogress.css" //styles of nprogress
// import "normalize.css/normalize.css"
import '@solana/wallet-adapter-react-ui/styles.css';
import '../styles/app.css';

// @ts-ignore
import withGA from 'next-ga';

import defaultTheme from '../styles/theme';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

const WalletProvider = dynamic(
    () => import('../components/WalletProvider/WalletProvider'),
    {
        ssr: false,
    }
);

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: deepPurple,
    },
});

function App(props: AppProps) {
    const { Component, pageProps } = props;

    // const [colorMode, setColorMode] = useColorMode()

    return (
        <MaterialThemeProvider theme={theme}>
            <ThemeProvider theme={defaultTheme}>
                <WalletProvider>
                    <div data-theme='cupcake' className='relative min-h-screen text-sm bg-base-200'>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </WalletProvider>
            </ThemeProvider>
        </MaterialThemeProvider>
    );
}

export default withGA(process.env.NEXT_PUBLIC_GA_ID, Router)(App);
