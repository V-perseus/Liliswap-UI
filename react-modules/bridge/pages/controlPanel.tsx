import { Box, ResponsiveContext } from "grommet";
import { Stack } from "grommet";
import Image from 'next/image';
import { useContext, useEffect, useState } from "react";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";
import { BridgeCtx } from "../../../contexts/bridgeContext";
import TransactionStatusL1toL2 from "./transactionStatusL1toL2";
import TransactionStatusL2toL1 from "./transactionStatusL2toL1";
import SwitchSection from "./switchSection";
import SelectSection from "./selectSection";
import TransferSection from "./transferSection";
import { ControlCtx } from "../contexts/controlContext";

const Network = {
  ETH: "ETHEREUM",
  POLYGON: "POLYGON",
};

declare let window: any;
declare let ethereum: any;

const ControlPanel = () => {
  const [currency, setCurrency] = useState("LLTH");
  const [networkFrom, setNetworkFrom] = useState(Network.ETH);
  const [networkTo, setNetworkTo] = useState(Network.POLYGON);
  const [turn, setTurn] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { switchNetworkToETH, switchNetworkToPolygon } =
    useContext(DemonzWeb3Ctx);
  const { remainingWithdraw, amountFromDB } = useContext(BridgeCtx);
  const [amount, setAmount] = useState(0);
  const [signNeeded, setSignNeeded] = useState(false);
  const [confirmNeeded, setConfirmNeeded] = useState(false);

  useEffect(() => {
    if (currency === "LLTH") {
      setNetworkTo(Network.POLYGON);
      setNetworkFrom(Network.ETH);
    } else {
      setNetworkTo(Network.ETH);
      setNetworkFrom(Network.POLYGON);
    }
  }, [currency]);

  useEffect(() => {
    if (networkTo === Network.ETH) {
      setCurrency("xLLTH");
      switchNetworkToPolygon();
    } else {
      setCurrency("LLTH");
      switchNetworkToETH();
    }
  }, [networkTo]);

  useEffect(() => {
    if (amountFromDB !== "") {
      setAmount(Number(amountFromDB));
    }
  }, [amountFromDB]);

  return (
    <ResponsiveContext.Consumer>
      {(size: any) => (
        <>
          <ControlCtx.Provider
            value={{
              currency: currency,
              setCurrency: setCurrency,
              networkFrom: networkFrom,
              setNetworkFrom: setNetworkFrom,
              networkTo: networkTo,
              setNetworkTo: setNetworkTo,
              turn: turn,
              setTurn: setTurn,
              hasStarted: hasStarted,
              setHasStarted: setHasStarted,
              amount: amount,
              setAmount: setAmount,
              signNeeded: signNeeded,
              setSignNeeded: setSignNeeded,
              confirmNeeded: confirmNeeded,
              setConfirmNeeded: setConfirmNeeded,
              size: size,
            }}
          >
            {!remainingWithdraw ? (
              <>
                {!hasStarted ? (
                  <>
                    <Box>
                      <Box
                        direction="column"
                        height="815px"
                        width="482px"
                        justify="center"
                        style={{ position: 'relative' }}
                      >
                        <div style={{ position: 'absolute' }}>
                          <Image src="/bridge_window.gif" width="482px" height="815px" />
                        </div>
                        {size === "large" && (
                          <Box
                            margin={{ top: "100px" }}
                            direction="column"
                            pad="60px"
                          >
                            <Stack>
                              <SelectSection />
                            </Stack>
                            <Stack>
                              <SwitchSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                            <Stack>
                              <TransferSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                          </Box>
                        )}
                        {size === "medium" && (
                          <Box
                            margin={{ top: "100px" }}
                            direction="column"
                            pad="60px"
                          >
                            <Stack>
                              <SelectSection />
                            </Stack>
                            <Stack>
                              <SwitchSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                            <Stack>
                              <TransferSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                          </Box>
                        )}
                        {size === "small" && (
                          <Box
                            margin={{ top: "60px" }}
                            direction="column"
                            pad="30px"
                          >
                            <Stack>
                              <SelectSection />
                            </Stack>
                            <Stack>
                              <SwitchSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                            <Stack>
                              <TransferSection
                                ETH={Network.ETH}
                                POLYGON={Network.POLYGON}
                              />
                            </Stack>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    {networkTo === "POLYGON" ? (
                      <TransactionStatusL1toL2 />
                    ) : (
                      <TransactionStatusL2toL1 />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <TransactionStatusL2toL1 />
              </>
            )}
          </ControlCtx.Provider>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default ControlPanel;
