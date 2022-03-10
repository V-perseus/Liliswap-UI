import { Box, ResponsiveContext } from "grommet";
import { useContext, useEffect, useState } from "react";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";
import { ControlCtx } from "../contexts/controlContext";
import transferButton from "../styles/assets/transferbutton1.png";
import transferButtonHover from "../styles/assets/transferbutton2.png";
import Image from "next/image";
import { web3SocketL1, web3SocketL2 } from "../../../utils/demonzWeb3";
import { BridgeCtx } from "../../../contexts/bridgeContext";
import Constants from "../../../constants/constants";

declare let window: any;
declare let ethereum: any;

const TransferSection = (props: any) => {
  const [image, setImage] = useState(transferButton);
  const { accounts, switchNetworkToETH, switchNetworkToPolygon } =
    useContext(DemonzWeb3Ctx);
  const {
    rootToken,
    childToken,
    setTxHash,
    addTxToDB,
    connectedToServer,
    connectedToMySQL,
    connectedToBlockchain,
  } = useContext(BridgeCtx);
  const { amount, networkTo, setHasStarted } = useContext(ControlCtx);
  const [balanceLLTH, setBalanceLLTH] = useState(0);
  const [balancexLLTH, setBalancexLLTH] = useState(0);

  useEffect(() => {
    const init = async () => {
      if (rootToken)
        await rootToken
          .getBalance(accounts[0])
          .then((res: any) => setBalanceLLTH(res));

      if (childToken)
        await childToken
          .getBalance(accounts[0])
          .then((res: any) => setBalancexLLTH(res));
    };
    init();
  }, [rootToken, childToken]);

  const bridge = async () => {
    if (connectedToServer && connectedToMySQL && connectedToBlockchain) {
      if (networkTo === props.POLYGON) {
        if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
          if (balanceLLTH >= amount) {
            if (
              (await rootToken.getAllowance(accounts[0])) <
              web3SocketL1.utils.toWei(web3SocketL1.utils.toBN(amount), "ether")
            ) {
              const approveResult = await rootToken.approveMax();
              const receipt = await approveResult.getReceipt();
              if (receipt) {
                const result = await rootToken.deposit(
                  web3SocketL1.utils.toWei(
                    web3SocketL1.utils.toBN(amount),
                    "ether"
                  ),
                  accounts[0]
                );
                const receipt = await result.getReceipt();
                if (receipt) {
                  setHasStarted(true);
                }
              }
            } else {
              const result = await rootToken.deposit(
                web3SocketL1.utils.toWei(
                  web3SocketL1.utils.toBN(amount),
                  "ether"
                ),
                accounts[0]
              );
              const receipt = await result.getReceipt();
              if (receipt) {
                setHasStarted(true);
              }
            }
          } else {
            // nice custom error
          }
        } else {
          switchNetworkToPolygon();
        }
      } else {
        if (window.ethereum.networkVersion === Constants.CHAIN_ID_POLYGON_DEC) {
          if (balancexLLTH >= amount) {
            const result = await childToken.withdrawStart(
              web3SocketL2.utils.toWei(web3SocketL2.utils.toBN(amount), "ether")
            );
            const txHash = await result.getTransactionHash();
            setTxHash(txHash);
            addTxToDB(txHash, accounts[0], 0, amount.toString());
            const receipt = await result.getReceipt();
            if (receipt) {
              switchNetworkToETH();
              setHasStarted(true);
            }
          } else {
            // Some sort of custom error
          }
        }
      }
    }
  };

  return (
    <ResponsiveContext.Consumer>
      {(size: any) => (
        <>
          {size === "large" && (
            <>
              <Box
                pad={{ left: "60px", right: "60px" }}
                gridArea="bottom"
                align="center"
                justify="center"
              >
                <div style={{ cursor: "pointer" }}>
                  <Image
                    src={image}
                    onMouseEnter={() => {
                      setImage(transferButtonHover);
                    }}
                    onMouseLeave={() => {
                      setImage(transferButton);
                    }}
                    onClick={() => bridge()}
                  />
                </div>
              </Box>
            </>
          )}
          {size === "medium" && (
            <>
              <Box
                pad={{ left: "60px", right: "60px" }}
                gridArea="bottom"
                align="center"
                justify="center"
              >
                <div style={{ cursor: "pointer" }}>
                  <Image
                    src={image}
                    onMouseEnter={() => {
                      setImage(transferButtonHover);
                    }}
                    onMouseLeave={() => {
                      setImage(transferButton);
                    }}
                    onClick={() => bridge()}
                  />
                </div>
              </Box>
            </>
          )}
          {size === "small" && (
            <>
              <Box
                margin={{ top: "10px" }}
                pad={{ left: "35px", right: "35px" }}
                gridArea="bottom"
                align="center"
                justify="center"
              >
                <div style={{ cursor: "pointer" }}>
                  <Image
                    src={image}
                    onMouseEnter={() => {
                      setImage(transferButtonHover);
                    }}
                    onMouseLeave={() => {
                      setImage(transferButton);
                    }}
                    onClick={() => bridge()}
                  />
                </div>
              </Box>
            </>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default TransferSection;
