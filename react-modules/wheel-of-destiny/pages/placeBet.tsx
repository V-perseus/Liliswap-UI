import {
  Box,
  RangeInput,
  TextInput,
  FormField,
  Text,
  Heading,
  RadioButtonGroup,
} from "grommet";
import React, { useContext, useState } from "react";
import "../styles/Home.module.css";
import { SpinButton } from "../demonzUIKit/elements";
import { AppCtx } from "../contexts/appContext";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";
import Constants from "../../../constants/constants";
import { web3SocketL2 } from "../../../utils/demonzWeb3";

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

function PlaceBet(props: any) {
  const {
    setValueBet,
    valueBet,
    setMultiplier,
    multiplier,
    setTxStarted,
    setPlacedBet,
    setTxIsDone,
    currency,
    color,
    setColor,
  } = useContext(AppCtx);
  const { accounts, contractWheel, L2_LLTH, spawn } = useContext(DemonzWeb3Ctx);
  const { switchNetworkToPolygon } = useContext(DemonzWeb3Ctx);
  const [colorNum, setColorNum] = useState(0);
  const minimumAmount = 1;

  //const placeBet = async () => {
  //const minimumAmount = 1;

  /*const suggestionsBetLLTH: Array<string> = [
    "1k LLTH",
    "10k LLTH",
    "100k LLTH",
  ];

  
  const onSuggestionSelectBetLLTH = (event: any) => {
    switch (event.suggestion) {
      case "1k LLTH":
        setValueBet(1000);
        break;
      case "10k LLTH":
        setValueBet(10000);
        break;
      case "100k LLTH":
        setValueBet(100000);
        break;
      default:
        setValueBet(Number(""));
    }
  };*/

  const placeBet = async () => {
    console.log("bet:", typeof valueBet, valueBet);
    if (valueBet < minimumAmount) return;

    setTxStarted(true);

    if (
      (await L2_LLTH.methods
        .allowance(accounts[0], Constants.WHEEL_ADDRESS)
        .call()) < web3SocketL2.utils.toWei(valueBet.toString(), "ether")
    ) {
      await L2_LLTH.methods
        .approve(
          Constants.WHEEL_ADDRESS,
          web3SocketL2.utils.toWei(
            web3SocketL2.utils.toBN(100000000000),
            "ether"
          )
        )
        .send({ from: accounts[0], gas: 3000000 });
    }
    await contractWheel.methods
      .placeBet(
        web3SocketL2.utils.toWei(valueBet.toString(), "ether"),
        multiplier,
        colorNum,
        spawn
      )
      .send({ from: accounts[0], gas: 3000000 });

    setTxIsDone(true);
    setPlacedBet(true);
  };

  return (
    <>
      <Box
        direction="column"
        animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
        gap="medium"
      >
        <FormField>
          <TextInput
            required={true}
            size="small"
            name="betAmount"
            placeholder="Bet Amount"
            value={valueBet}
            onChange={(event) => setValueBet(Number(event.target.value))}
            icon={
              <Text color="#562B76" size="medium">
                {currency}
              </Text>
            }
            reverse
          />
          {valueBet < 1 && (
            <Text style={{ paddingLeft: 10, color: "red" }}>
              Please input at least 1.0 xLLTH
            </Text>
          )}
        </FormField>
        <FormField>
          <Box gap="medium" direction="column" align="center">
            <RadioButtonGroup
              name="doc"
              options={["black", "red"]}
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
                if (event.target.value == "black") setColorNum(0);
                else setColorNum(1);
              }}
              direction="row"
            />
            <RangeInput
              min="2"
              max="13"
              value={multiplier}
              onChange={(value) => {
                setMultiplier(Number(value.target.value));
              }}
            />

            <Heading color="#fff" textAlign="center">
              {multiplier}
            </Heading>
          </Box>
        </FormField>
        <SpinButton
          onClick={() => {
            if (
              window.ethereum.networkVersion !== Constants.CHAIN_ID_POLYGON_DEC
            ) {
              switchNetworkToPolygon();
            } else {
              placeBet();
            }
          }}
        />
      </Box>
    </>
  );
}

export default PlaceBet;
