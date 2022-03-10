import React, { useContext, useEffect } from "react";
import demonzface from "../styles/assets/demonzface.png";
import demonzface_b from "../styles/assets/demonzface_b.png";
import wonPic from "../styles/assets/won.png";
import Image from "next/image";
import "../styles/Home.module.css";
import { Box, Button, Text } from "grommet";
import styled, { css } from "styled-components";
import { AppCtx } from "../contexts/appContext";
import laughing_devil from "../styles/assets/laughing_devilwindow4x.gif";
import blowing_kiss from "../styles/assets/blowing_kiss.gif";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

function ResultModal(props: any) {
  const {
    setValueBet,
    won,
    setMultiplier,
    setWinningMultiplier,
    setPlacedBet,
    setTxStarted,
    setIsEnded,
    setWon,
    setReset,
    reset,
    valueBet,
    winningMultiplier,
    setIsSpinning,
    setIsTxModalOpen,
    setStartSpin,
    setTxIsDone,
    colorWin,
    numWin,
  } = useContext(AppCtx);
  const { spawn } = useContext(DemonzWeb3Ctx);

  const newGame = () => {
    setValueBet(0);
    setMultiplier(2);
    setWinningMultiplier(0);
    setPlacedBet(false);
    setTxStarted(false);
    setIsEnded(false);
    setWon(false);
    if (reset === 0) setReset(1);
    else setReset(0);
    setIsSpinning(false);
    setIsTxModalOpen(false);
    setStartSpin(false);
    setTxIsDone(false);
  };

  return (
    <>
      <ModalContainer>
        {props.size === "large" ? (
          <>
            {!won ? (
              <Box
                className="wheel-modal-box"
                pad="medium"
                background={{ image: "url(/you_lost.png)" }}
                justify="center"
                animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
                onClick={() => newGame()}
              >
                <Box
                  direction="column"
                  gap="medium"
                  align="center"
                  animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
                >
                  <Image
                    className="wheel"
                    height="200px"
                    width="200px"
                    src={laughing_devil}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                height="medium"
                width="medium"
                pad="medium"
                background={{ image: "url(/you_won.png)" }}
                justify="center"
                animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
                onClick={() => newGame()}
              >
                <Box
                  direction="column"
                  gap="small"
                  align="center"
                  animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
                >
                  <Image
                    className="wheel"
                    height="100px"
                    width="100px"
                    src={blowing_kiss}
                  />
                  {numWin && (
                    <Text size="large">
                      {spawn === 0 && valueBet * 12}
                      {spawn === 1 && (valueBet * 12 * 1.1).toFixed(2)}
                      {spawn === 2 && (valueBet * 12 * 1.2).toFixed(2)}
                      {spawn === 3 && (valueBet * 12 * 1.3).toFixed(2)}{" "}
                      <Text color="#fff" size="large">
                        xLLTH
                      </Text>
                    </Text>
                  )}
                  <>
                    {colorWin && (
                      <Text size="large">
                        {spawn === 0 && valueBet}
                        {spawn === 1 && (valueBet * 1.1).toFixed(2)}
                        {spawn === 2 && (valueBet * 1.2).toFixed(2)}
                        {spawn === 3 && (valueBet * 1.3).toFixed(2)}{" "}
                        <Text color="#fff" size="large">
                          xLLTH
                        </Text>
                      </Text>
                    )}
                  </>
                  <Text textAlign="center" size="xsmall">
                    YOU WILL RECEIVE YOUR PRIZE WITHIN A FEW SECONDS.
                  </Text>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <>
            {!won ? (
              <Box
                height="250px"
                width="250px"
                pad="medium"
                background={{ image: "url(/you_lost.png)" }}
                justify="center"
                animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
                onClick={() => newGame()}
              >
                <Box
                  direction="column"
                  gap="medium"
                  align="center"
                  animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
                >
                  <Image
                    className="wheel"
                    height="200px"
                    width="200px"
                    src={laughing_devil}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                height="250px"
                width="250px"
                pad="medium"
                background={{ image: "url(/you_won.png)" }}
                justify="center"
                animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
                onClick={() => newGame()}
              >
                <Box
                  direction="column"
                  gap="small"
                  align="center"
                  animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
                >
                  <Image
                    className="wheel"
                    height="50px"
                    width="50px"
                    src={blowing_kiss}
                  />
                  {numWin && (
                    <Text size="medium">
                      {spawn === 0 && valueBet * 12}
                      {spawn === 1 && (valueBet * 12 * 1.1).toFixed(2)}
                      {spawn === 2 && (valueBet * 12 * 1.2).toFixed(2)}
                      {spawn === 3 && (valueBet * 12 * 1.3).toFixed(2)}{" "}
                      <Text color="#fff" size="medium">
                        xLLTH
                      </Text>
                    </Text>
                  )}
                  <>
                    {colorWin && (
                      <Text size="medium">
                        {spawn === 0 && valueBet}
                        {spawn === 1 && (valueBet * 1.1).toFixed(2)}
                        {spawn === 2 && (valueBet * 1.2).toFixed(2)}
                        {spawn === 3 && (valueBet * 1.3).toFixed(2)}{" "}
                        <Text color="#fff" size="medium">
                          xLLTH
                        </Text>
                      </Text>
                    )}
                  </>
                  <Text textAlign="center" size="xsmall">
                    YOU WILL RECEIVE YOUR PRIZE WITHIN A FEW SECONDS.
                  </Text>
                </Box>
              </Box>
            )}
          </>
        )}
      </ModalContainer>
    </>
  );
}

export default ResultModal;
