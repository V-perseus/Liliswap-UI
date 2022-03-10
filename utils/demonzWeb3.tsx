import Web3 from "web3";
import Constants from "../constants/constants";
import L1_LLTH_ARTIFACT from "../artifacts/LLTH_L1.json";
import Spawn1 from "../artifacts/Demonzv1_production.json";
import Spawn2 from "../artifacts/Demonzv2_production.json";
import Wheel from "../artifacts/Wheel.json";
import Web3ClientPlugin from "@maticnetwork/maticjs-web3";
import { FxPortalPlugin, FxPortalClient } from "@maticnetwork/maticjs-fxportal";
import { use } from "@maticnetwork/maticjs";
use(Web3ClientPlugin);
use(FxPortalPlugin);
declare let window: any;
declare let ethereum: any;

export const web3SocketL1: any = new Web3(
  new Web3.providers.WebsocketProvider(Constants.WEBSOCKET_ADDRESS_ETH)
);

export const web3SocketL2: any = new Web3(
  new Web3.providers.WebsocketProvider(Constants.WEBSOCKET_ADDRESS_POLYGON)
);

// Web socket
export const L1_LLTH_WS = new web3SocketL1.eth.Contract(
  L1_LLTH_ARTIFACT,
  Constants.L1_LLTH_ADDRESS
);

export const contractWheelWS: any = new web3SocketL2.eth.Contract(
  Wheel,
  Constants.WHEEL_ADDRESS
);

export const contractSpawn1WS: any = new web3SocketL1.eth.Contract(
  Spawn1,
  Constants.SPAWN1_ADDRESS
);

export const contractSpawn2WS: any = new web3SocketL1.eth.Contract(
  Spawn2,
  Constants.SPAWN2_ADDRESS
);

export const getSpawnVersion: any = async (account: any) => {
  let result = 0;
  let spawnV1Cnt = 0;
  let spawnV2Cnt = 0;

  // TURN THESE ON, ON MAINNET! TURN THESE OFF, ON TESTNET!
  spawnV1Cnt = await contractSpawn1WS.methods.balanceOf(account).call();
  spawnV2Cnt = await contractSpawn2WS.methods.balanceOf(account).call();

  if (spawnV1Cnt > 0) result = 1;
  else if (spawnV2Cnt > 0) result = 2;

  return result;
};

export const send = async (web3: any, account: any, transaction: any) => {
  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: 3000000,
  };
  const signed = await web3.eth.accounts.signTransaction(
    options,
    account.privateKey
  );
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  return receipt;
};

export const fxPortalClientInit: any = new FxPortalClient({
  network: "testnet",
  version: "mumbai",
  parent: {
    provider: Constants.RPC_ETH,
    defaultConfig: {
      from: "0x0",
    },
  },
  child: {
    provider: Constants.RPC_POLYGON,
    defaultConfig: {
      from: "0x0",
    },
  },
  erc20: {
    rootTunnel: Constants.ROOT_TUNNEL,
    childTunnel: Constants.CHILD_TUNNEL,
  },
});
