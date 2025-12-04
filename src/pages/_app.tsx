// pages/_app.tsx
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import DashboardLayout from "@/components/DashboardLayout";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // Pages where navbar should be hidden
  const noLayoutPages = ["/auth/login"];

  const hideNavbar = noLayoutPages.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardLayout hideNavbar={hideNavbar}>
        <Component {...pageProps} />
      </DashboardLayout>
    </ThemeProvider>
  );
}
