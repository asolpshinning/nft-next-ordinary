import { AddressZero } from "@ethersproject/constants";
import {
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
  Pack,
  QueryAllParams,
  Role,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";

export const networkKeys = {
  all: ["network"],
  chain: (chainId) =>
    [...networkKeys.all, chainId]
};

export const dashboardKeys = {
  all: ["dashboard"],
  lists: () => [...dashboardKeys.all, "list"],
  list: (address = AddressZero) => [...dashboardKeys.lists(), address],
};
export const bundleKeys = {
  all: ["bundle"],
  lists: () => [...bundleKeys.all, "list"],
  list: (address = AddressZero) => [...bundleKeys.lists(), address],
  listWithActor: (address = AddressZero, actingAddress = "") =>
    [...bundleKeys.list(address), { actingAddress }],
};

export const dropKeys = {
  all: ["drop"],
  lists: () => [...dropKeys.all, "list"],
  list: (address = AddressZero) => [...dropKeys.lists(), address],
  details: () => [...dropKeys.all, "detail"],
  detail: (address = AddressZero) => [...dropKeys.details(), address],
  batchesToReveal: (address = AddressZero) =>
    [...dropKeys.details(), address, "batchesToReveal"],
  supply: (address = AddressZero) =>
    [...dropKeys.detail(address), "supply"],
  activeClaimCondition: (address = AddressZero) =>
    [...dropKeys.detail(address), "activeClaimCondition"],
  claimPhases: (address = AddressZero) =>
    [...dropKeys.detail(address), "claimPhases"],
  balanceOf: (address = AddressZero, userAddress = AddressZero) =>
    [
      ...dropKeys.detail(address),
      "balanceOf",
      { address: userAddress },
    ],
};

export const bundleDropKeys = {
  all: ["bundle-drop"],
  lists: () => [...dropKeys.all, "list"],
  list: (address = AddressZero) => [...dropKeys.lists(), address],
  details: () => [...dropKeys.all, "detail"],
  detail: (address = AddressZero) => [...dropKeys.details(), address],
  activeClaimCondition: (address = AddressZero, tokenId = "-1") =>
    [...dropKeys.detail(address), "activeClaimCondition", { tokenId }],
  claimPhases: (address = AddressZero, tokenId = "-1") =>
    [...dropKeys.detail(address), "claimPhases", { tokenId }],
  owned: (address = AddressZero, ownerAddress = AddressZero) =>
    [...dropKeys.detail(address), "owned", { ownerAddress }],
  balanceOf: (
    address = AddressZero,
    userAddress = AddressZero,
    tokenId = "-1",
  ) =>
    [
      ...dropKeys.detail(address),
      "balanceOf",
      { address: userAddress, tokenId },
    ],
};

export const contractKeys = {
  all: ["contract"],
  lists: () => [...contractKeys.all, "list"],
  list: (address = AddressZero) => [...contractKeys.lists(), address],
  listWithFilters: (address = AddressZero, filters) =>
    [...contractKeys.list(address), { filters }],
  details: () => [...contractKeys.all, "detail"],
  detail: (address = AddressZero) =>
    [...contractKeys.details(), address],
};

export const contractRoleKeys = {
  all: ["contract_roles"],
  lists: () => [...contractRoleKeys.all, "list"],
  list: (address = AddressZero) =>
    [...contractRoleKeys.lists(), address],

  details: () => [...contractRoleKeys.all, "detail"],
  detail: (address = AddressZero, role) =>
    [...contractRoleKeys.details(), address, { role }],
};

export const nftCollectionKeys = {
  all: ["nft_collection"],
  lists: () => [...nftCollectionKeys.all, "list"],
  list: (address = AddressZero, queryParams) =>
    queryParams
      ? ([...nftCollectionKeys.lists(), address, queryParams])
      : ([...nftCollectionKeys.lists()]),
};

export const packKeys = {
  all: ["pack"],
  lists: () => [...packKeys.all, "list"],
  list: (address = AddressZero) => [...packKeys.lists(), address],
  details: () => [...packKeys.all, "detail"],
  detail: (address = AddressZero) =>
    [...packKeys.details(), address],
  rewards: (address = AddressZero, tokenId = "-1") =>
    [...packKeys.detail(address), "rewards", tokenId],
  linkBalance: (address = AddressZero) => [
    ...packKeys.detail(address),
    "linkBalance",
  ],
  balanceOf: (
    address = AddressZero,
    userAddress = AddressZero,
    tokenId = "-1",
  ) =>
    [
      ...packKeys.detail(address),
      "balanceOf",
      { address: userAddress, tokenId },
    ],
};

export const tokenKeys = {
  all: ["token"],
  details: () => [...tokenKeys.all, "detail"],
  decimals: (address = AddressZero) =>
    [...tokenKeys.details(), "decimals", address],
  detail: (
    address = AddressZero,
    walletAddress = AddressZero,
  ) => [...tokenKeys.details(), address, { walletAddress }],
  balanceOf: (
    address = AddressZero,
    walletAddress = AddressZero,
  ) =>
    [...tokenKeys.details(), address, "balanceOf", { walletAddress }],
  // hack
  list: (address = AddressZero, walletAddress = AddressZero) =>
    tokenKeys.detail(address, walletAddress),
};

export const marketplaceKeys = {
  all: ["marketplace"],
  lists: () => [...marketplaceKeys.all, "list"],
  list: (address = AddressZero) =>
    [...marketplaceKeys.lists(), address],
  detail: (address = AddressZero) => [...marketplaceKeys.all, address],
  isRestricted: (address = AddressZero) =>
    [...marketplaceKeys.detail(address), "isOpen"],
};

export const splitsKeys = {
  all: ["splits"],
  lists: () => [...splitsKeys.all, "list"],
  list: (address = AddressZero) => [...splitsKeys.lists(), address],
};

export const voteKeys = {
  all: ["vote"],
  detail: (address = AddressZero) => [...voteKeys.all, address],
  proposals: (address = AddressZero) =>
    [...voteKeys.detail(address), "proposals"],
  proposal: (proposalId = "-1", address = AddressZero) =>
    [...voteKeys.proposals(address), proposalId],
  balances: (address = AddressZero, addresses = [] ) =>
    [...voteKeys.detail(address), "balances", { addresses }],
  delegations: (address = AddressZero) =>
    [...voteKeys.detail(address), "delegations"],
  delegation: (address = AddressZero, userAddress = AddressZero) =>
    [...voteKeys.delegations(address), userAddress],
  userHasVotedOnProposal: (
    proposalId = "-1",
    address = AddressZero,
    userAddress = AddressZero,
  ) =>
    [
      ...voteKeys.proposal(proposalId, address),
      "hasVotedOnProposal",
      userAddress,
    ],
  canExecuteProposal: (proposalId = "-1", address = AddressZero) =>
    [...voteKeys.proposal(proposalId, address), "canExecute"],
};

export const recipientKeys = {
  all: ["recipient"],
  detail: (address = AddressZero) => [...recipientKeys.all, address],
  token: (address = AddressZero, tokenId = "-1") =>
    [...recipientKeys.detail(address), tokenId],
};

export const royaltyKeys = {
  all: ["royalty"],
  detail: (address = AddressZero) => [...royaltyKeys.all, address],
  token: (address = AddressZero, tokenId = "-1") =>
    [...royaltyKeys.detail(address), tokenId],
};

// NFTs owned by wallet for wrapping
export const assetKeys = {
  all: ["assets"],
  detail: (userAddress = AddressZero) =>
    [...assetKeys.all, userAddress],
};

// Tokens owned by wallet for wrapping
export const tokenAssetKeys = {
  all: ["tokenAssets"],
  detail: (userAddress = AddressZero) =>
    [...tokenAssetKeys.all, userAddress],
};

// Link balance
export const linkBalanceKeys = {
  all: ["linkBalance"],
  detail: (userAddress = AddressZero) =>
    [...linkBalanceKeys.all, userAddress],
};

export const CacheKeyMap = {
  [NFTCollection.contractType]: nftCollectionKeys,
  [Edition.contractType]: bundleKeys,
  [Token.contractType]: tokenKeys,
  [NFTDrop.contractType]: dropKeys,
  [EditionDrop.contractType]: bundleDropKeys,
  [Vote.contractType]: voteKeys,
  [Marketplace.contractType]: marketplaceKeys,
  [Pack.contractType]: packKeys,
  [Split.contractType]: splitsKeys,
};
