import { useWeb3 } from "@3rdweb-sdk/react";
import { useSDK, useToken, useVote } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";
import { voteKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useContractMetadata } from "./useContract";

export function useVoteContractMetadata(contractAddress) {
  return useContractMetadata(useVote(contractAddress));
}

export function useVoteProposalList(contractAddress) {
  const voteContract = useVote(contractAddress);
  return useQueryWithNetwork(
    voteKeys.proposals(contractAddress),
    () => voteContract?.getAll(),
    {
      enabled: !!voteContract && !!contractAddress,
    },
  );
}

export function useHasVotedOnProposal(proposalId, contractAddress) {
  const { address } = useWeb3();
  const voteContract = useVote(contractAddress);
  return useQueryWithNetwork(
    voteKeys.userHasVotedOnProposal(proposalId, contractAddress, address),
    () => voteContract?.hasVoted(proposalId, address),
    {
      enabled: !!voteContract && !!contractAddress,
    },
  );
}

export function useCanExecuteProposal(proposalId, contractAddress) {
  const voteContract = useVote(contractAddress);
  return useQueryWithNetwork(
    voteKeys.canExecuteProposal(proposalId, contractAddress),
    () => voteContract?.canExecute(proposalId),
    {
      enabled: !!voteContract && !!contractAddress,
    },
  );
}

export function useTokensDelegated(contractAddress) {
  const sdk = useSDK();
  const { address } = useWeb3();
  const voteContract = useVote(contractAddress);
  return useQueryWithNetwork(
    voteKeys.delegation(contractAddress, address),
    async () => {
      invariant(address, "address is required");
      invariant(voteContract, "vote contract is required");

      const metadata = await voteContract?.metadata.get();
      const tokenAddress = metadata?.voting_token_address;
      const tokenContract = sdk?.getToken(tokenAddress);
      const delegation = await tokenContract?.getDelegationOf(address);
      return delegation?.toLowerCase() === address.toLowerCase();
    },
    {
      enabled: !!voteContract && !!address,
    },
  );
}

export function useVoteTokenBalances(contractAddress, addresses) {
  const { data } = useVoteContractMetadata(contractAddress);
  const tokenContract = useToken((data)?.voting_token_address || "");

  return useQueryWithNetwork(
    voteKeys.balances(contractAddress, addresses),
    async () => {
      invariant(data, "contract metadata is required");
      invariant(tokenContract, "voting contract is required");
      invariant(addresses, "addresses are required");

      const balances = addresses.map(async (address) => {
        return {
          address,
          balance: (await tokenContract.balanceOf(address)).displayValue,
        };
      });

      return await Promise.all(balances);
    },
    {
      enabled: !!data && !!contractAddress && !!addresses?.length,
    },
  );
}

export function useProposalCreateMutation(contractAddress) {
  const voteContract = useVote(contractAddress);
  return useMutationWithInvalidate(
    (proposal) => {
      invariant(voteContract, "contract is required");
      const { description } = proposal;
      return voteContract.propose(description);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([voteKeys.proposals(contractAddress)]);
      },
    },
  );
}

export function useDelegateMutation(contractAddress) {
  const sdk = useSDK();
  const { address } = useWeb3();
  const voteContract = useVote(contractAddress);
  return useMutationWithInvalidate(
    async () => {
      invariant(address, "address is required");
      invariant(contractAddress, "contract address is required");
      invariant(voteContract, "vote contract is required");

      const metadata = await voteContract?.metadata.get();
      const tokenAddress = metadata?.voting_token_address;
      const tokenContract = sdk?.getToken(tokenAddress);
      return tokenContract?.delegateTo(address);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([voteKeys.delegation(contractAddress, address)]);
      },
    },
  );
}

export function useCastVoteMutation(proposalId, contractAddress) {
  const { address } = useWeb3();
  const voteContract = useVote(contractAddress);
  return useMutationWithInvalidate(
    async (vote) => {
      invariant(voteContract, "contract is required");
      invariant(address, "address is required");
      const { voteType, reason } = vote;
      return voteContract.vote(proposalId, voteType, reason);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([
          voteKeys.proposals(contractAddress),
          voteKeys.userHasVotedOnProposal(proposalId, contractAddress, address),
          voteKeys.canExecuteProposal(proposalId, contractAddress),
        ]);
      },
    },
  );
}

export function useExecuteProposalMutation (proposalId, contractAddress) {
  const voteContract = useVote(contractAddress);
  return useMutationWithInvalidate(
    async () => {
      invariant(voteContract, "contract is required");
      return voteContract.execute(proposalId);
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([
          voteKeys.proposals(contractAddress),
          voteKeys.canExecuteProposal(proposalId, contractAddress),
        ]);
      },
    },
  );
}
