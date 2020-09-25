import "src/components/style.scss";

import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "theme";

export default function ({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
