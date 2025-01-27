// pages/_app.tsx  
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../components/header/HeaderMegaMenu';
import { FooterSocial } from '../components/footer/FooterSocial';
import { theme } from './theme';
import { Provider } from "react-redux";
import store from "../store/store";

const AppContent = ({ Component, pageProps }: AppProps) => {
  
  return (
    <MantineProvider theme={theme}>
      <HeaderMegaMenu />
      <Component {...pageProps} />
      <FooterSocial />
    </MantineProvider>
  );
};

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <AppContent {...props} />
    </Provider>
  );
}