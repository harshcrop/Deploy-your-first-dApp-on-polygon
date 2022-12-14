import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import { ethers } from "ethers";
import ABI from "./contract/ABI.json";

function App() {
  const { data: signer, isError, isLoading } = useSigner();

  // console.log("hahs", typeof signer._address);

  const contract = useContractRead({
    address: "0xCa47923720D80da060a622e2C15DB3a1172f5dC4",
    abi: ABI,
    functionName: "name",
  });

  console.log(contract);

  const { config } = usePrepareContractWrite({
    address: "0xCa47923720D80da060a622e2C15DB3a1172f5dC4",
    abi: ABI,
    functionName: "changeName",
    args: ["Polygon guild Ahm"],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess,
    write,
  } = useContractWrite(config);

  const conr = useContractWrite({
    mode: "recklesslyUnprepared",
    address: "0x8AB8E250c4AfEC2223A4eA9c886091895f3E4246",
    abi: ABI,
    functionName: "receiveNative",
    overrides: {
      from: "0xEA2d168D845434c2F3F59eDF79F7A8Ae17A779D6",
      value: ethers.utils.parseEther("0.01"),
    },
  });

  const {
    data: data1,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    write: write1,
  } = useContractWrite(conr);

  // console.log(conr);

  return (
    <div>
      <ConnectButton />
      <button className="bg-violet-500	py-4 px-8" onClick={() => write?.()}>
        Button
      </button>

      {isLoading2 && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data2)}</div>}
    </div>
  );
}

export default App;
