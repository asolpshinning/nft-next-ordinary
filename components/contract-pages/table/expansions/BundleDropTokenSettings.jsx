import { DropPhases } from "components/contract-tabs/phases/DropPhases";
export const BundleDropTokenSettingsSection = ({ contract, tokenId }) => {
  return <DropPhases contract={contract} tokenId={tokenId} />;
};
