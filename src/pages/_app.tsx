// pages/_app.tsx  
import "@/styles/globals.css";  
import type { AppProps } from "next/app";  
import '@mantine/core/styles.css';  
import { MantineProvider, ColorSchemeScript } from '@mantine/core';  
import { HeaderMegaMenu } from '../components/header/HeaderMegaMenu';  
import { FooterSocial } from '../components/footer/FooterSocial';  
import { theme } from './theme';  
import { Provider } from "react-redux";  
import store, { RootState } from "../store/store";  
import { useSelector } from "react-redux";  

const AppContent = ({ Component, pageProps }: AppProps) => {  
  const colorScheme = useSelector((state: RootState) => state.theme.theme); 

  return (  
    <>
      <ColorSchemeScript />
      <MantineProvider theme={theme} forceColorScheme={colorScheme}>  
        <HeaderMegaMenu />  
        <Component {...pageProps} />  
        <FooterSocial />  
      </MantineProvider>  
    </>
  );  
};  

export default function App({ Component, pageProps }: AppProps) {  
  return (  
    <Provider store={store}>  
      <AppContent Component={Component} pageProps={pageProps} />  
    </Provider>  
  );  
}