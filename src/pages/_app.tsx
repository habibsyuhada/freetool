// pages/_app.tsx  
import "@/styles/globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'react-quill-new/dist/quill.snow.css';
import '@/styles/quill.css';
import type { AppProps } from "next/app";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { HeaderMegaMenu } from '../components/header/HeaderMegaMenu';
import { FooterSocial } from '../components/footer/FooterSocial';
import { theme } from '../styles/theme';
import { Provider } from "react-redux";
import store from "../store/store";
import { SessionProvider } from "next-auth/react";
import { LoadingProvider } from '@/components/loading/LoadingOverlay';

function AppContent({ Component, pageProps }: { Component: AppProps['Component']; pageProps: Record<string, unknown> }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <HeaderMegaMenu />
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
      <FooterSocial />
    </MantineProvider>
  );
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AppContent Component={Component} pageProps={pageProps} />
      </Provider>
    </SessionProvider>
  );
}