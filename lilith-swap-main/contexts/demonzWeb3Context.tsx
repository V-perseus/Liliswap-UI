import { createContext } from "react";

interface DemonzWeb3Interface {
  accounts: Array<string>;
  connected: boolean;
  web3: any;
  L1_LLTH: any;
  L2_LLTH: any;
  spawn: number;
  contractWheel: any;
  setAccounts: (accounts: []) => void;
  setConnected: (connected: boolean) => void;
  connectMetaMask: () => void;
  switchNetworkToETH: () => void;
  switchNetworkToPolygon: () => void;
  requestAccounts: () => void;
  addLLTH: () => void;
  addxLLTH: () => void;
}

export const DemonzWeb3Ctx = createContext<DemonzWeb3Interface>({
  accounts: [],
  connected: false,
  web3: undefined,
  L1_LLTH: undefined,
  L2_LLTH: undefined,
  spawn: 0,
  contractWheel: undefined,
  setAccounts: () => undefined,
  setConnected: () => undefined,
  connectMetaMask: () => undefined,
  switchNetworkToETH: () => undefined,
  switchNetworkToPolygon: () => undefined,
  requestAccounts: () => undefined,
  addLLTH: () => undefined,
  addxLLTH: () => undefined,
});
