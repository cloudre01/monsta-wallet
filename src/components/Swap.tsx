import { Box, Button, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import {
  approveAbi,
  xchangeAbi,
  xchangeAddress,
  xMONI_address,
} from "../constants";
import CustomModal from "./CustomModal";

declare let window: any;

const Swap = () => {
  const [moniAmt, setMoniAmt] = useState<number>(0);
  const [sttAmt, setSttAmt] = useState<number>(0);
  const [approve, setApprove] = useState<boolean>(false);
  const [swap, setSwap] = useState<boolean>(false);

  const loadUser = async ({
    swapAmt,
    xSTTAmt,
  }: {
    swapAmt: number;
    xSTTAmt: number;
  }) => {
    if (!window.monsta) {
      alert("Please install monsta wallet!");
      return;
    }

    try {
      await window.monsta.request({ method: "eth_accounts" });

      const provider = new ethers.providers.Web3Provider(window.monsta);
      const signer = provider.getSigner();

      const xMoniContract = new ethers.Contract(
        xMONI_address,
        approveAbi,
        signer
      );

      const xchangeContract = new ethers.Contract(
        xchangeAddress,
        xchangeAbi,
        signer
      );

      const convertedAmt = ethers.utils
        .parseEther(swapAmt.toString())
        .toString();

      // Load approve screen
      setApprove(true);
      let result = await xMoniContract.approve(xchangeAddress, convertedAmt);

      await result.wait();
      setApprove(false);

      // Load swap screen
      setSwap(true);

      let date = +new Date().setDate(31);

      result = await xchangeContract.swapExactMoniForStt(
        convertedAmt,
        (xSTTAmt * 10 ** 8).toString(),
        date
      );

      const tx = await result.wait();

      setSwap(false);

      console.log(tx);
      alert("You have successfully swap your xMONI tokens for xSTT tokens!");
    } catch (e) {
      console.log("failed", e);
      setApprove(false);
    }
  };

  return (
    <>
      <Box sx={{ padding: "0.5rem" }}>
        <TextField
          id="xmoni-amount"
          label="xMONI Amount"
          variant="outlined"
          value={moniAmt}
          onChange={(e) => setMoniAmt(+e.target.value)}
          type={"number"}
        />
      </Box>
      <Box sx={{ padding: "0.5rem" }}>
        <TextField
          id="xstt-amount"
          label="xSTT Amount"
          variant="outlined"
          value={sttAmt}
          onChange={(e) => setSttAmt(+e.target.value)}
          type={"number"}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ borderRadius: "2.5rem" }}
        onClick={() => loadUser({ swapAmt: moniAmt, xSTTAmt: sttAmt })}
      >
        Swap
      </Button>
      <CustomModal
        open={approve}
        title={"Approving..."}
        content={"Please approve the amount to be exchanged."}
      />
      <CustomModal
        open={swap}
        title={"Swapping..."}
        content={"Please wait while we swap your tokens."}
      />
    </>
  );
};

export default Swap;
