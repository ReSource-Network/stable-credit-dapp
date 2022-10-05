import { Alfajores, Localhost, Mainnet } from "@celo-tools/use-contractkit"
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

const client = new QueryClient()
const Main = ({ Component, pageProps }: AppProps) => {
  let network
  switch (config.NETWORK_NAME) {
    case "celo":
      network = Mainnet
      break
    case "celo-alfajores":
      network = Alfajores
      break
    default:
      network = { ...Localhost, chainId: 31337 }
  }

  const { chains, provider, webSocketProvider } = configureChains(
    [CHAIN_INFO[42220], chain.mainnet, ...defaultL2Chains],
    [publicProvider()],
  )

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors: [new MetaMaskConnector({ chains })],
    webSocketProvider,
  })

  return (
    <ThemeProvider>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider theme="rounded">
          <QueryClientProvider client={client}>
            <Updater />
            <Popups />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default Main
