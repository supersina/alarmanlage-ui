import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../styles/globals.css";
import { extendedTheme } from "../theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
