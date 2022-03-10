import { Box, Stack, Text, ResponsiveContext } from "grommet";
import { useContext, useEffect, useState } from "react";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";
import { ControlCtx } from "../contexts/controlContext";
import txStatus from "../styles/assets/transactionstatus.png";
import processingWindow from "../styles/assets/processing_window.png";
import withdrawButtonBlocked from "../styles/assets/withdraw_blocked.png";
import withdrawButton from "../styles/assets/withdraw_a.png";
import withdrawButtonHover from "../styles/assets/withdraw_b.png";
import newTransactionButton from "../styles/assets/newtransactionbutton1.png";
import newTransactionButtonHover from "../styles/assets/newtransactionbutton2.png";
import Image from "next/image";
import { BridgeCtx } from "../../../contexts/bridgeContext";
import Constants from "../../../constants/constants";

declare let window: any;
declare let ethereum: any;

const textBeforeWithdraw =
  "Your tokens have been sent to the Ethereum network. Once they have arrived, you can withdraw them. This will take about 15-20 mins.";
const textAfterWithdraw = "Your LLTH tokens are successfully withdrawn!";

const TransactionStatus = () => {
  const [currentNetwork, setCurrentNetwork] = useState(
    window.ethereum.networkVersion
  );
  const [image, setImage] = useState(withdrawButton);
  const { switchNetworkToETH } = useContext(DemonzWeb3Ctx);
  const {
    isChecked,
    isWithdrawn,
    rootToken,
    txHash,
    modifyIsWithdraw,
    setTxHash,
    setIsChecked,
    setIsWithdrawn,
    setRemainingWithdraw,
    setAmountFromDB,
    connectedToServer,
    connectedToMySQL,
    connectedToBlockchain,
  } = useContext(BridgeCtx);
  const {
    amount,
    setTurn,
    setHasStarted,
    setAmount,
    setSignNeeded,
    setConfirmNeeded,
  } = useContext(ControlCtx);

  const newTransaction = () => {
    setTurn(false);
    setHasStarted(false);
    setAmount(0);
    setSignNeeded(false);
    setConfirmNeeded(false);
    setTxHash("");
    setIsChecked(false);
    setIsWithdrawn(false);
    setRemainingWithdraw(false);
    setAmountFromDB("");
  };

  const withdrawOnEth = async () => {
    if (connectedToServer && connectedToMySQL && connectedToBlockchain) {
      if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
        if (rootToken && txHash) {
          const result = await rootToken.withdrawExit(txHash);
          const receipt = await result.getReceipt();
          if (receipt) {
            modifyIsWithdraw(txHash);
            newTransaction();
          }
        }
      } else {
        switchNetworkToETH();
      }
    }
  };

  useEffect(() => {
    setCurrentNetwork(window.ethereum.networkVersion);
  }, [window.ethereum.networkVersion]);

  return (
    <>
      <ResponsiveContext.Consumer>
        {(size: any) => (
          <>
            {size === "large" && (
              <Box gap="medium">
                <Box
                  direction="column"
                  height="815px"
                  width="482px"
                  style={{ position: 'relative' }}
                >
                  <div style={{ position: 'absolute' }}>
                    <Image src="/bridge_window.gif" width="482px" height="815px" />
                  </div>
                  <Box
                    margin={{ top: "170px" }}
                    direction="column"
                    pad="60px"
                    gap="small"
                  >
                    <Stack>
                      <Image src={txStatus} />
                      <Box
                        gridArea="top"
                        direction="column"
                        pad="medium"
                        align="center"
                        justify="center"
                        gap="large"
                      >
                        <Box
                          width="500px"
                          height="150px"
                          direction="column"
                          align="center"
                          justify="center"
                          pad="small"
                          gap="80px"
                        >
                          <Box
                            direction="row"
                            gap="xlarge"
                            margin={{ top: "30px" }}
                          >
                            <Box direction="column" align="center">
                              <Text color="#fff" size="medium" weight="bold">
                                From:
                              </Text>
                              <Text color="#fff" size="large">
                                POLYGON
                              </Text>
                            </Box>

                            <Box direction="column" align="center">
                              <Text color="#fff" size="medium" weight="bold">
                                To:
                              </Text>
                              <Text color="#fff" size="large">
                                ETHEREUM
                              </Text>
                            </Box>
                          </Box>
                          <Box direction="column" align="center">
                            <Text
                              color="#fff"
                              size="large"
                              weight="bold"
                              textAlign="center"
                            >
                              Amount Transferring
                            </Text>
                            <Text color="#fff" size="xlarge">
                              {amount} xLLTH
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack>
                      <Image src={processingWindow} />
                      <Box align="center" margin={{ top: "10px" }} pad="small">
                        {!isWithdrawn ? (
                          <Text
                            textAlign="center"
                            color="#fff"
                            size="medium"
                            weight="bold"
                          >
                            {textBeforeWithdraw}
                          </Text>
                        ) : (
                          <Box align="center" margin={{ top: "20px" }}>
                            <Text
                              textAlign="center"
                              color="#fff"
                              size="large"
                              weight="bold"
                            >
                              {textAfterWithdraw}
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                    <Box
                      pad={{ left: "60px", right: "60px", bottom: "30px" }}
                      gridArea="bottom"
                      align="center"
                      justify="center"
                    >
                      {!isWithdrawn ? (
                        <>
                          {isChecked ? (
                            <div style={{ cursor: "pointer" }}>
                              <Image
                                src={image}
                                onMouseEnter={() => {
                                  setImage(withdrawButtonHover);
                                }}
                                onMouseLeave={() => {
                                  setImage(withdrawButton);
                                }}
                                onClick={() => withdrawOnEth()}
                              />
                            </div>
                          ) : (
                            <Image src={withdrawButtonBlocked} />
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ cursor: "pointer" }}>
                            <Image
                              src={newTransactionButton}
                              onMouseEnter={() => {
                                setImage(newTransactionButtonHover);
                              }}
                              onMouseLeave={() => {
                                setImage(newTransactionButton);
                              }}
                              onClick={() => newTransaction()}
                            />
                          </div>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {size === "medium" && (
              <Box gap="medium">
                <Box
                  direction="column"
                  height="815px"
                  width="482px"
                  style={{ position: 'relative' }}
                >
                  <div style={{ position: 'absolute' }}>
                    <Image src="/bridge_window.gif" width="482px" height="815px" />
                  </div>
                  <Box
                    margin={{ top: "170px" }}
                    direction="column"
                    pad="60px"
                    gap="small"
                  >
                    <Stack>
                      <Image src={txStatus} />
                      <Box
                        gridArea="top"
                        direction="column"
                        pad="medium"
                        align="center"
                        justify="center"
                        gap="large"
                      >
                        <Box
                          width="500px"
                          height="150px"
                          direction="column"
                          align="center"
                          justify="center"
                          pad="small"
                          gap="80px"
                        >
                          <Box
                            direction="row"
                            gap="xlarge"
                            margin={{ top: "30px" }}
                          >
                            <Box direction="column" align="center">
                              <Text color="#fff" size="medium" weight="bold">
                                From:
                              </Text>
                              <Text color="#fff" size="large">
                                POLYGON
                              </Text>
                            </Box>

                            <Box direction="column" align="center">
                              <Text color="#fff" size="medium" weight="bold">
                                To:
                              </Text>
                              <Text color="#fff" size="large">
                                ETHEREUM
                              </Text>
                            </Box>
                          </Box>
                          <Box direction="column" align="center">
                            <Text
                              color="#fff"
                              size="large"
                              weight="bold"
                              textAlign="center"
                            >
                              Amount Transferring
                            </Text>
                            <Text color="#fff" size="xlarge">
                              {amount} LLTH
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack>
                      <Image src={processingWindow} />
                      <Box align="center" margin={{ top: "10px" }} pad="small">
                        {!isWithdrawn ? (
                          <Text
                            textAlign="center"
                            color="#fff"
                            size="medium"
                            weight="bold"
                          >
                            {textBeforeWithdraw}
                          </Text>
                        ) : (
                          <Box align="center" margin={{ top: "20px" }}>
                            <Text
                              textAlign="center"
                              color="#fff"
                              size="large"
                              weight="bold"
                            >
                              {textAfterWithdraw}
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                    <Box
                      pad={{ left: "60px", right: "60px", bottom: "30px" }}
                      gridArea="bottom"
                      align="center"
                      justify="center"
                    >
                      {!isWithdrawn ? (
                        <>
                          {isChecked ? (
                            <div style={{ cursor: "pointer" }}>
                              <Image
                                src={image}
                                onMouseEnter={() => {
                                  setImage(withdrawButtonHover);
                                }}
                                onMouseLeave={() => {
                                  setImage(withdrawButton);
                                }}
                                onClick={() => withdrawOnEth()}
                              />
                            </div>
                          ) : (
                            <Image src={withdrawButtonBlocked} />
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ cursor: "pointer" }}>
                            <Image
                              src={newTransactionButton}
                              onMouseEnter={() => {
                                setImage(newTransactionButtonHover);
                              }}
                              onMouseLeave={() => {
                                setImage(newTransactionButton);
                              }}
                              onClick={() => newTransaction()}
                            />
                          </div>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {size === "small" && (
              <Box gap="medium">
                <Box
                  direction="column"
                  height="815px"
                  width="482px"
                  style={{ position: 'relative' }}
                >
                  <div style={{ position: 'absolute' }}>
                    <Image src="/bridge_window.gif" width="482px" height="815px" />
                  </div>
                  <Box
                    margin={{ top: "255px" }}
                    direction="column"
                    pad="12%"
                    gap="small"
                  >
                    <Stack>
                      <Image src={txStatus} />
                      <Box
                        gridArea="top"
                        direction="column"
                        pad="small"
                        align="center"
                        justify="center"
                        gap="large"
                      >
                        <Box
                          width="500px"
                          height="150px"
                          direction="column"
                          align="center"
                          justify="center"
                          pad="xsmall"
                          gap="15px"
                        >
                          <Box direction="row" gap="xlarge">
                            <Box direction="column" align="center">
                              <Text color="#fff" size="xsmall" weight="bold">
                                From:
                              </Text>
                              <Text color="#fff" size="small">
                                POLYGON
                              </Text>
                            </Box>

                            <Box direction="column" align="center">
                              <Text color="#fff" size="xsmall" weight="bold">
                                To:
                              </Text>
                              <Text color="#fff" size="small">
                                ETHEREUM
                              </Text>
                            </Box>
                          </Box>
                          <Box direction="column" align="center">
                            <Text
                              color="#fff"
                              size="small"
                              weight="bold"
                              textAlign="center"
                            >
                              Amount Transferring
                            </Text>
                            <Text color="#fff" size="medium">
                              {amount} xLLTH
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack>
                      <Image height="250px" src={processingWindow} />
                      <Box align="center" margin={{ top: "5px" }} pad="small">
                        {!isWithdrawn ? (
                          <Text
                            textAlign="center"
                            color="#fff"
                            size="xsmall"
                            weight="bold"
                          >
                            {textBeforeWithdraw}
                          </Text>
                        ) : (
                          <Box align="center" margin={{ top: "5px" }}>
                            <Text
                              textAlign="center"
                              color="#fff"
                              size="medium"
                              weight="bold"
                            >
                              {textAfterWithdraw}
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                    <Box
                      pad={{ left: "30px", right: "30px", bottom: "30px" }}
                      gridArea="bottom"
                      align="center"
                      justify="center"
                    >
                      {!isWithdrawn ? (
                        <>
                          {isChecked ? (
                            <div style={{ cursor: "pointer" }}>
                              <Image
                                src={image}
                                onMouseEnter={() => {
                                  setImage(withdrawButtonHover);
                                }}
                                onMouseLeave={() => {
                                  setImage(withdrawButton);
                                }}
                                onClick={() => withdrawOnEth()}
                              />
                            </div>
                          ) : (
                            <Image src={withdrawButtonBlocked} />
                          )}
                        </>
                      ) : (
                        <>
                          <div style={{ cursor: "pointer" }}>
                            <Image
                              src={newTransactionButton}
                              onMouseEnter={() => {
                                setImage(newTransactionButtonHover);
                              }}
                              onMouseLeave={() => {
                                setImage(newTransactionButton);
                              }}
                              onClick={() => newTransaction()}
                            />
                          </div>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </>
        )}
      </ResponsiveContext.Consumer>
    </>
  );
};

export default TransactionStatus;
