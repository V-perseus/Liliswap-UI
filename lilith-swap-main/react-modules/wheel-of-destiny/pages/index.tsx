import { Box } from "grommet";
import { grommet } from "grommet/themes";
import { Grommet, Grid, ResponsiveContext } from "grommet";
import "../styles/Home.module.css";
import { deepMerge } from "grommet/utils";
import WheelComponent from "./wheelComponent";
import TxModal from "./txModal";
import UnderHeaderText from "./underHeaderText";
import BottomButtons from "./bottomButtons";
import React from "react";
import customTheme from "../constants/style";
import logo from "../styles/assets/logo.png";
import Image from "next/image";
import { AppCtx } from "../contexts/appContext";
import { web3SocketL2, contractWheelWS } from "../../../utils/demonzWeb3";
import Web3 from "web3";
import ResultModal from "./resultModal";

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

interface Props {}

interface State {
  contractWheel: any;
  contractLLTH: any;
  valueBet: number;
  multiplier: number;
  winningMultiplier: number;
  connected: boolean;
  accounts: Array<string>;
  placedBet: boolean;
  owner: string;
  isTxModalOpen: boolean;
  txStarted: boolean;
  isSpinning: boolean;
  isEnded: boolean;
  won: boolean;
  reset: number;
  rotateValue: any;
  requestId: string;
  startSpin: boolean;
  txIsDone: boolean;
  currency: string;
  spawn: number;
  color: string;
  colorNum: number;
  colorWin: boolean;
  numWin: boolean;
}

class WheelOfDestiny extends React.Component<Props, State> {
  web3: any;

  rotateValues = new Map([
    [1, 4725],
    [2, 4700], // segment: rotation
    [3, 3950],
    [4, 3550],
    [5, 4250],
    [6, 3500],
    [7, 3825],
    [8, 3800],
    [9, 3775],
    [10, 3750],
    [11, 3725],
    [12, 3700],
    [13, 3675],
  ]);

  constructor(props: Props) {
    super(props);
    if (typeof window !== "undefined") {
      this.web3 = new Web3(window.ethereum);
    }
    this.state = {
      contractWheel: undefined,
      contractLLTH: undefined,
      valueBet: 0,
      multiplier: 2,
      winningMultiplier: 0,
      connected: false,
      accounts: [],
      placedBet: false,
      owner: "",
      isTxModalOpen: false,
      txStarted: false,
      isSpinning: false,
      isEnded: false,
      won: true,
      reset: 0,
      rotateValue: undefined,
      requestId: "",
      startSpin: false,
      txIsDone: false,
      currency: "xLLTH",
      spawn: 0,
      color: "black",
      colorNum: 0,
      colorWin: false,
      numWin: false,
    };
    this.setIsSpinning = this.setIsSpinning.bind(this);
    this.setIsEnded = this.setIsEnded.bind(this);
    this.setAccounts = this.setAccounts.bind(this);
    this.setIsTxModalOpen = this.setIsTxModalOpen.bind(this);
    this.setValueBet = this.setValueBet.bind(this);
    this.setMultiplier = this.setMultiplier.bind(this);
    this.setConnected = this.setConnected.bind(this);
    this.setTxStarted = this.setTxStarted.bind(this);
    this.setWinningMultiplier = this.setWinningMultiplier.bind(this);
    this.setPlacedBet = this.setPlacedBet.bind(this);
    this.setWon = this.setWon.bind(this);
    this.setReset = this.setReset.bind(this);
    this.setStartSpin = this.setStartSpin.bind(this);
    this.setTxIsDone = this.setTxIsDone.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.setSpawn = this.setSpawn.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setColorNum = this.setColorNum.bind(this);
  }

  requestAccounts = async () => {
    const accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((err: Error) => {
        console.error(err);
      });

    this.setState({ accounts: accounts });

    if (accounts.length > 0) this.setState({ connected: true });
    else this.setState({ connected: false });
  };

  componentDidMount() {
    this.requestAccounts();
    if (web3SocketL2) {
      contractWheelWS.events.RequestIdIsCreated({}).on("data", (event: any) => {
        if (
          this.state.accounts[0] &&
          event.returnValues.player.toUpperCase() ===
            this.state.accounts[0].toUpperCase()
        ) {
          //console.log("requestId: ", event.returnValues.requestId);
          this.setState({ requestId: event.returnValues.requestId });
        }
      });
      contractWheelWS.events.RandomIsArrived({}).on("data", (event: any) => {
        if (
          this.state.requestId &&
          event.returnValues.requestId === this.state.requestId
        ) {
          this.setState({
            winningMultiplier: event.returnValues.randomNumber,
            rotateValue: this.rotateValues.get(
              Number(event.returnValues.randomNumber)
            ),
            isTxModalOpen: false,
          });

          if (this.state.color === "black") this.setColorNum(0);
          else this.setColorNum(1);

          if (
            Number(this.state.multiplier) ===
              Number(event.returnValues.randomNumber) ||
            Number(event.returnValues.randomNumber) % 2 === this.state.colorNum
          ) {
            if (
              Number(event.returnValues.randomNumber) % 2 ===
              this.state.colorNum
            ) {
              this.setState({ colorWin: true });
            } else {
              this.setState({ colorWin: false });
            }

            if (
              Number(this.state.multiplier) ===
              Number(event.returnValues.randomNumber)
            ) {
              this.setState({ numWin: true });
            } else {
              this.setState({ numWin: false });
            }

            this.setState({ won: true });
          } else {
            this.setState({ won: false });
            this.setState({ colorWin: false });
            this.setState({ numWin: false });
          }
        }
      });
    }
    if (this.state.accounts !== undefined && this.state.accounts.length > 0) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }
  }

  setIsSpinning(value: boolean) {
    this.setState({ isSpinning: value });
  }

  setIsEnded(value: boolean) {
    this.setState({ isEnded: value });
  }

  setAccounts(accounts: Array<string>) {
    this.setState({ accounts: accounts });
  }

  setIsTxModalOpen(value: boolean) {
    this.setState({ isTxModalOpen: value });
  }

  setValueBet(value: number) {
    this.setState({ valueBet: value });
  }

  setMultiplier(value: number) {
    this.setState({ multiplier: value });
  }

  setConnected(value: boolean) {
    this.setState({ connected: value });
  }

  setTxStarted(value: boolean) {
    this.setState({ txStarted: value });
  }

  setWinningMultiplier(value: number) {
    this.setState({ winningMultiplier: value });
  }
  setPlacedBet(value: boolean) {
    this.setState({ placedBet: value });
  }

  setWon(value: boolean) {
    this.setState({ won: value });
  }

  setReset(value: number) {
    this.setState({ reset: value });
  }

  setStartSpin(value: boolean) {
    this.setState({ startSpin: value });
  }

  setTxIsDone(value: boolean) {
    this.setState({ txIsDone: value });
  }

  setCurrency(value: any) {
    this.setState({ currency: value });
  }

  setSpawn(value: number) {
    this.setState({ spawn: value });
  }

  setColor(value: string) {
    this.setState({ color: value });
  }

  setColorNum(value: number) {
    this.setState({ colorNum: value });
  }

  render() {
    return (
      <>
        <AppCtx.Provider
          value={{
            valueBet: this.state.valueBet,
            multiplier: this.state.multiplier,
            winningMultiplier: this.state.winningMultiplier,
            placedBet: this.state.placedBet,
            owner: this.state.owner,
            isTxModalOpen: this.state.isTxModalOpen,
            txStarted: this.state.txStarted,
            isSpinning: this.state.isSpinning,
            isEnded: this.state.isEnded,
            won: this.state.won,
            reset: this.state.reset,
            rotateValue: this.state.rotateValue,
            requestId: this.state.requestId,
            startSpin: this.state.startSpin,
            colorNum: this.state.colorNum,
            colorWin: this.state.colorWin,
            setIsSpinning: this.setIsSpinning,
            setIsEnded: this.setIsEnded,
            setIsTxModalOpen: this.setIsTxModalOpen,
            setValueBet: this.setValueBet,
            setMultiplier: this.setMultiplier,
            setTxStarted: this.setTxStarted,
            setWinningMultiplier: this.setWinningMultiplier,
            setPlacedBet: this.setPlacedBet,
            setWon: this.setWon,
            setReset: this.setReset,
            setStartSpin: this.setStartSpin,
            txIsDone: this.state.txIsDone,
            setTxIsDone: this.setTxIsDone,
            setCurrency: this.setCurrency,
            currency: this.state.currency,
            color: this.state.color,
            setColor: this.setColor,
            setColorNum: this.setColorNum,
            numWin: this.state.numWin,
          }}
        >
          <Grommet
            theme={deepMerge(grommet, customTheme)}
            background={{
              repeat: "no-repeat",
              image: "url('/background.png')",
            }}
          >
            <ResponsiveContext.Consumer>
              {(size: any) => (
                <>
                  <Grid
                    fill={true}
                    pad="medium"
                    rows={["full"]}
                    columns={["auto", "flex", "auto"]}
                    gap="small"
                    areas={[
                      { name: "left", start: [0, 0], end: [0, 0] },
                      { name: "center", start: [1, 0], end: [1, 0] },
                      { name: "right", start: [2, 0], end: [2, 0] },
                    ]}
                  >
                    <Box gridArea="left" />
                    <Box
                      className="mainBox"
                      direction="column"
                      align="center"
                      justify="center"
                      alignSelf="center"
                      gridArea="center"
                      gap="medium"
                    >
                      <Box>
                        <Image src={logo} />
                      </Box>
                      <Box>
                        <UnderHeaderText />
                      </Box>
                      <Box>
                        <WheelComponent size={size} key={this.state.reset} />
                      </Box>
                      <Box>
                        <BottomButtons />
                      </Box>
                    </Box>
                    <Box gridArea="right" />
                  </Grid>
                  {this.state.isTxModalOpen && <TxModal size={size} />}
                  {this.state.isEnded && <ResultModal size={size} />}
                </>
              )}
            </ResponsiveContext.Consumer>
          </Grommet>
        </AppCtx.Provider>
      </>
    );
  }
}

export default WheelOfDestiny;
