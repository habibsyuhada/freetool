import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from '../components/header/HeaderMegaMenu';
import { FooterSocial } from '../components/footer/FooterSocial';
import { theme } from './theme';
import { ThemeProvider } from './ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <MantineProvider theme={theme}>
        <HeaderMegaMenu />
        <Component {...pageProps} />
        <FooterSocial />
      </MantineProvider>
    </ThemeProvider>
  );
}
