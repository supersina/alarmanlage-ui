import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

import "../styles/globals.css";
import { extendedTheme } from "../theme/theme";

import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
