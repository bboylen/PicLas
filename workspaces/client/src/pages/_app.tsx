import { AppProps } from "next/app";
import "@styles/main.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SocketManagerProvider } from "@components/websocket/SocketManagerProvider";
import { NotificationsProvider } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { pageView } from "@utils
import { RecoilRoot } from "recoil";

export default function _App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => pageView(url);

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // });

  return (
    <RecoilRoot>
      <Head>
        <title>PicLash</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="PicLash" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{
          key: "mantine",
          prepend: false,
        }}
        theme={{
          colorScheme: "dark",
          radius: {
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
          },
        }}
      >
        <NotificationsProvider position="top-right" limit={15}>
          <SocketManagerProvider>
            <Component {...pageProps} />
          </SocketManagerProvider>
        </NotificationsProvider>
      </MantineProvider>
    </RecoilRoot>
  );
}
