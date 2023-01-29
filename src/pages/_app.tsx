import { type AppType } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import { api } from "../utils/api";

import "../styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
});

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      bglight: "#1e709e10",
      borderlight: "#00000030",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>
    <style jsx global>{`
    :root {
      --font-inter: var(${inter.style.fontFamily});
    }
    `}</style>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>;
};

export default api.withTRPC(MyApp);
