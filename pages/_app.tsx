import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../styles/globals.css";
import { extendedTheme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={extendedTheme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
