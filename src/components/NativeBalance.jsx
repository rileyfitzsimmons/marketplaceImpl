import { useNativeBalance } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";

/**
 * Displays balance of native currency of chain (ETH on Ethereum)
 * @param {*} props
 * @returns {*} JSX Elemenet
 */

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props);

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>{`${n4.format(
      balance.formatted
    )} ${nativeName}`}</div>
  );
}

export default NativeBalance;
