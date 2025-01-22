import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { HeaderMegaMenu } from '../components/header/HeaderMegaMenu';
import { FooterSocial } from '../components/footer/FooterSocial';
const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <HeaderMegaMenu />
      <Component {...pageProps} />
      <FooterSocial />
    </MantineProvider>
  );
}
