import { CacheKeyMap, recipientKeys, royaltyKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import {
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";
import invariant from "tiny-invariant";

export function useRealContract(contract) {
  if (contract instanceof NFTDrop) {
    return contract;
  } else if (contract instanceof EditionDrop) {
    return contract;
  } else if (contract instanceof NFTCollection) {
    return contract;
  } else if (contract instanceof Edition) {
    return contract;
  } else if (contract instanceof Token) {
    return contract;
  } else if (contract instanceof Marketplace) {
    return contract;
  } else if (contract instanceof Vote) {
    return contract;
  } else if (contract instanceof Split) {
    return contract;
  }

  throw new Error("Contract is not a valid contract");
}

export function useContractConstructor(
  contract
) {
  if (contract instanceof NFTDrop) {
    return NFTDrop;
  } else if (contract instanceof EditionDrop) {
    return EditionDrop;
  } else if (contract instanceof NFTCollection) {
    return NFTCollection;
  } else if (contract instanceof Edition) {
    return Edition;
  } else if (contract instanceof Token) {
    return Token;
  } else if (contract instanceof Marketplace) {
    return Marketplace;
  } else if (contract instanceof Vote) {
    return Vote;
  } else if (contract instanceof Split) {
    return Split;
  }

  throw new Error("Contract is not a valid contract");
}

export function useContractTypeOfContract(
  contract
) {
  if (!contract) {
    return null;
  } else if (contract instanceof NFTDrop) {
    return NFTDrop.contractType;
  } else if (contract instanceof EditionDrop) {
    return EditionDrop.contractType;
  } else if (contract instanceof NFTCollection) {
    return NFTCollection.contractType;
  } else if (contract instanceof Edition) {
    return Edition.contractType;
  } else if (contract instanceof Token) {
    return Token.contractType;
  } else if (contract instanceof Marketplace) {
    return Marketplace.contractType;
  } else if (contract instanceof Vote) {
    return Vote.contractType;
  } else if (contract instanceof Split) {
    return Split.contractType;
  }

  throw new Error("Contract does not have a contractType");
}

export function useContractName(
  contract
) {
  if (!contract) {
    return null;
  } else if (contract instanceof NFTDrop) {
    return "NFTDrop";
  } else if (contract instanceof EditionDrop) {
    return "EditionDrop";
  } else if (contract instanceof NFTCollection) {
    return "NFTCollection";
  } else if (contract instanceof Edition) {
    return "Edition";
  } else if (contract instanceof Token) {
    return "Token";
  } else if (contract instanceof Marketplace) {
    return "Marketplace";
  } else if (contract instanceof Vote) {
    return "Vote";
  } else if (contract instanceof Split) {
    return "Split";
  }

  throw new Error("Contract does not have a contractType");
}


export function hasPrimarySaleMechanic(
  contract
) {
  return "primarySale" in contract;
}

export function useSaleRecipient(
  contract,
  tokenId
) {
  return useQueryWithNetwork(
    tokenId
      ? recipientKeys.token(contract?.getAddress(), tokenId)
      : recipientKeys.detail(contract?.getAddress()),
    () => {
      return contract?.primarySale.getRecipient();
    },
    {
      enabled: !!contract,
    },
  );
}
export function useSetSaleRecipientMutation(contract, tokenId) {
  return useMutationWithInvalidate(
    (recipientAddress) => {
      invariant(contract, "contract must be defined");

      return contract?.primarySale.setRecipient(recipientAddress);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        if (tokenId) {
          invalidate([recipientKeys.token(contract?.getAddress(), tokenId)]);
        } else {
          invalidate([recipientKeys.detail(contract?.getAddress())]);
        }
      },
    },
  );
}

export function hasRoyaltyMechanic(
  contract,
) {
  return "royalty" in contract;
}

export function useContractRoyalty(
  contract
) {
  return useQueryWithNetwork(
    royaltyKeys.detail(contract?.getAddress()),
    () => contract?.royalty.getDefaultRoyaltyInfo(),
    {
      enabled: !!contract,
    },
  );
}
export function useContractRoyaltyMutation(
  contract
) {
  return useMutationWithInvalidate(
    (data) => {
      invariant(contract, "contract must be defined");

      return contract?.royalty.setDefaultRoyaltyInfo(data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        invalidate([royaltyKeys.detail(contract?.getAddress())]);
      },
    },
  );
}

export function useTransferMutation(
  contract
) {
  const contractType = useContractTypeOfContract(contract);

  return useMutationWithInvalidate(
    async (transferData) => {
      invariant(
        contract,
        "Contract is not a valid contract. Please use a valid contract",
      );
      invariant(
        "transfer" in contract,
        "contract does not support transfer functionality",
      );
      if (contract instanceof NFTCollection || contract instanceof NFTDrop) {
        invariant(transferData.tokenId, "tokenId is required");
        return await contract.transfer(transferData.to, transferData.tokenId);
      } else if (
        contract instanceof Edition ||
        contract instanceof EditionDrop
      ) {
        invariant(transferData.amount, "amount is required");
        invariant(transferData.tokenId, "tokenId is required");

        return await contract.transfer(
          transferData.to,
          transferData.tokenId,
          transferData.amount,
        );
      } else if (contract instanceof Token) {
        invariant(transferData.amount, "amount is required");
        return await contract.transfer(transferData.to, transferData.amount);
      }
      throw new Error("Contract is not a valid contract");
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // this should not be possible, but we need to catch it in case it does
        // if we don't know we just invalited everything.
        if (!contractType) {
          return invalidate(
            Object.keys(CacheKeyMap)
              .map((key) => {
                const cacheKeys = CacheKeyMap[key];
                if ("list" in cacheKeys) {
                  return cacheKeys.list(contract?.getAddress());
                }
                return undefined;
              })
              .filter((fn) => !!fn),
          );
        }

        return invalidate([
          CacheKeyMap[contractType].list(contract?.getAddress()),
        ]);
      },
    },
  );
}
