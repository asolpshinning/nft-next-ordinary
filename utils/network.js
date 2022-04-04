export const ChainId = {
  Mainnet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  BSC: 56,
  xDai: 100,
  Polygon: 137,
  Moonriver: 1285,
  Mumbai: 80001,
  Harmony: 1666600000,
  Localhost: 1337,
  Hardhat: 31337,
  Fantom: 250,
  FantomTestnet: 4002,
  Avalanche: 43114,
  AvalancheFujiTestnet: 43113,
}

export const SUPPORTED_CHAIN_IDS = [
  ChainId.Mainnet,
  ChainId.Rinkeby,
  ChainId.Goerli,
  ChainId.Polygon,
  ChainId.Mumbai,
  ChainId.Fantom,
  // ChainId.FantomTestnet,
  ChainId.Avalanche,
  // ChainId.AvalancheFujiTestnet,
];

export const SUPPORTED_CHAIN_IDS_V1 = [
  ChainId.Mainnet,
  ChainId.Rinkeby,
  ChainId.Polygon,
  ChainId.Mumbai,
  ChainId.Fantom,
  ChainId.Avalanche,
];

export const SupportedChainIdToNetworkMap =
  {
    [ChainId.Mainnet]: "ethereum",
    [ChainId.Rinkeby]: "rinkeby",
    [ChainId.Goerli]: "goerli",
    [ChainId.Polygon]: "polygon",
    [ChainId.Mumbai]: "mumbai",
    [ChainId.Fantom]: "fantom",
    // [ChainId.FantomTestnet]: "fantom-testnet",
    [ChainId.Avalanche]: "avalanche",
    // [ChainId.AvalancheFujiTestnet]: "avalanche-fuji",
  }

export const SupportedNetworkToChainIdMap = {
  ethereum: ChainId.Mainnet,
  rinkeby: ChainId.Rinkeby,
  goerli: ChainId.Goerli,
  polygon: ChainId.Polygon,
  mumbai: ChainId.Mumbai,
  fantom: ChainId.Fantom,
  // "fantom-testnet": ChainId.FantomTestnet,
  avalanche: ChainId.Avalanche,
  // "avalanche-fuji": ChainId.AvalancheFujiTestnet,
}

export const NetworkToBlockTimeMap = {
  [ChainId.Mainnet]: "14",
  [ChainId.Rinkeby]: "14",
  [ChainId.Goerli]: "14",
  [ChainId.Polygon]: "2",
  [ChainId.Mumbai]: "2",
  [ChainId.Fantom]: "0.7",
  [ChainId.Avalanche]: "3",
};

export function getChainIdFromNetwork(network) {
  if (!network || !SupportedNetworkToChainIdMap[network]) {
    return undefined;
  }

  return SupportedNetworkToChainIdMap[network];
}

export function isSupportedNetwork(network) {
  return network ? network in SupportedNetworkToChainIdMap : false;
}

export function getNetworkFromChainId(chainId) {
  return SupportedChainIdToNetworkMap[chainId] || "";
}
