import "@fontsource/museomoderno/400.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Popups } from "../components"
import { Updater } from "../components/Updater"
import { Layout } from "../layouts"
import "../styles/index.css"
import { ThemeProvider } from "../styles/theme"
import { CHAIN_INFO, config } from "../config"
import {
  chain,
  createClient,
  configureChains,
  WagmiConfig,
  defaultL2Chains,
} from "wagmi"
import { ConnectKitProvider } from "connectkit"
import { publicProvider } from "wagmi/providers/public"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { useColorMode } from "@chakra-ui/react"

const { chains, provider, webSocketProvider } = configureChains(
  [CHAIN_INFO[42220], chain.hardhat, chain.mainnet, ...defaultL2Chains],
  [publicProvider()],
)

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors: [new MetaMaskConnector({ chains })],
  webSocketProvider,
})

const client = new QueryClient()
const Main = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitWrapper {...pageProps} Component={Component} />
      </WagmiConfig>
    </ThemeProvider>
  )
}

const ConnectKitWrapper = ({ Component, pageProps }: AppProps) => {
  const { colorMode } = useColorMode()

  return (
    <ConnectKitProvider mode={colorMode}>
      <QueryClientProvider client={client}>
        <Updater />
        <Popups />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ConnectKitProvider>
  )
}

export default Main
