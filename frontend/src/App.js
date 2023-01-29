import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { DevicePage } from "./pages/DevicePage";
import Home from "./pages/Home";
import ListDevice from "./pages/ListDevice";
import ListDeviceForm from "./pages/ListDeviceForm";
import RentDevice from "./pages/RentDevice";
import RentPage from "./pages/RentPage";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const HyperspaceChain = {
  id: 3141,
  name: 'Filecoin Hyperspace',
  network: 'Filecoin Hyperspace',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'FileCoin',
    symbol: 'IFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hyperspace.node.glif.io/rpc/v1'],
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum,HyperspaceChain],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <RentDevice />{" "}
                </Layout>
              }
            />
            <Route
              path="/rent"
              element={
                <Layout>
                  <RentDevice />{" "}
                </Layout>
              }
            />
            <Route path="/deviceForm" element={<ListDeviceForm />} />
            <Route
              path="/list"
              element={
                <Layout>
                  <ListDevice />{" "}
                </Layout>
              }
            />
            <Route path="/list/:id" element={<DevicePage />} />
            <Route path="/rent/:id" element={<RentPage />} />
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
