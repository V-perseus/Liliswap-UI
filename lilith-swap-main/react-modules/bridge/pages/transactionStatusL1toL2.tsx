import { Box, Stack, Text, ResponsiveContext } from "grommet";
import { useContext, useState } from "react";
import { ControlCtx } from "../contexts/controlContext";
import txStatus from "../styles/assets/transactionstatus.png";
import processingWindow from "../styles/assets/processing_window.png";
import newTransactionButton from "../styles/assets/newtransactionbutton1.png";
import newTransactionButtonHover from "../styles/assets/newtransactionbutton2.png";
import Image from "next/image";

const TransactionStatus = () => {
  const [image, setImage] = useState(newTransactionButton);

  const {
    amount,
    networkTo,
    networkFrom,
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
  };

  return (
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
                              {networkFrom}
                            </Text>
                          </Box>

                          <Box direction="column" align="center">
                            <Text color="#fff" size="medium" weight="bold">
                              To:
                            </Text>
                            <Text color="#fff" size="large">
                              {networkTo}
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
                    <Box align="center" margin={{ top: "15px" }} pad="small">
                      <Text
                        textAlign="center"
                        color="#fff"
                        size="large"
                        weight="bold"
                      >
                        You'll receive your tokens on Polygon as xLLTH within
                        10-15 mins. Thank you!
                      </Text>
                    </Box>
                  </Stack>
                  <Box
                    pad={{ left: "30px", right: "30px", bottom: "30px" }}
                    gridArea="bottom"
                    align="center"
                    justify="center"
                  >
                    <div style={{ cursor: "pointer" }}>
                      <Image
                        src={image}
                        onMouseEnter={() => {
                          setImage(newTransactionButtonHover);
                        }}
                        onMouseLeave={() => {
                          setImage(newTransactionButton);
                        }}
                        onClick={() => newTransaction()}
                      />
                    </div>
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
                              {networkFrom}
                            </Text>
                          </Box>

                          <Box direction="column" align="center">
                            <Text color="#fff" size="medium" weight="bold">
                              To:
                            </Text>
                            <Text color="#fff" size="large">
                              {networkTo}
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
                    <Box align="center" margin={{ top: "15px" }} pad="small">
                      <Text
                        textAlign="center"
                        color="#fff"
                        size="large"
                        weight="bold"
                      >
                        You'll receive your tokens on Polygon as xLLTH within
                        10-15 mins. Thank you!
                      </Text>
                    </Box>
                  </Stack>
                  <Box
                    pad={{ left: "30px", right: "30px", bottom: "30px" }}
                    gridArea="bottom"
                    align="center"
                    justify="center"
                  >
                    <div style={{ cursor: "pointer" }}>
                      <Image
                        src={image}
                        onMouseEnter={() => {
                          setImage(newTransactionButtonHover);
                        }}
                        onMouseLeave={() => {
                          setImage(newTransactionButton);
                        }}
                        onClick={() => newTransaction()}
                      />
                    </div>
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
                              {networkFrom}
                            </Text>
                          </Box>

                          <Box direction="column" align="center">
                            <Text color="#fff" size="xsmall" weight="bold">
                              To:
                            </Text>
                            <Text color="#fff" size="small">
                              {networkTo}
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
                            {amount} LLTH
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Stack>
                  <Stack>
                    <Image src={processingWindow} />
                    <Box align="center" margin={{ top: "10px" }} pad="small">
                      <Text
                        textAlign="center"
                        color="#fff"
                        size="xsmall"
                        weight="bold"
                      >
                        You'll receive your tokens on Polygon as xLLTH within
                        10-15 mins. Thank you!
                      </Text>
                    </Box>
                  </Stack>
                  <Box
                    pad={{ left: "30px", right: "30px", bottom: "30px" }}
                    gridArea="bottom"
                    align="center"
                    justify="center"
                  >
                    <div style={{ cursor: "pointer" }}>
                      <Image
                        src={image}
                        onMouseEnter={() => {
                          setImage(newTransactionButtonHover);
                        }}
                        onMouseLeave={() => {
                          setImage(newTransactionButton);
                        }}
                        onClick={() => newTransaction()}
                      />
                    </div>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default TransactionStatus;
