import { createContext } from "react";

interface BridgeInterface {
  fxPortalClient: any;
  rootToken: any;
  childToken: any;
  txHash: string;
  isChecked: boolean;
  isWithdrawn: boolean;
  remainingWithdraw: boolean;
  amountFromDB: string;
  connectedToServer: boolean;
  connectedToMySQL: boolean;
  connectedToBlockchain: boolean;
  addTxToDB: (
    txHash: string,
    address: string,
    isWithdrawn: number,
    amount: string
  ) => void;
  getLatestTx: (address: string) => void;
  modifyIsWithdraw: (txHash: string) => void;
  setTxHash: (txHash: string) => void;
  setIsChecked: (value: boolean) => void;
  setIsWithdrawn: (value: boolean) => void;
  setRemainingWithdraw: (value: boolean) => void;
  setAmountFromDB: (value: string) => void;
}

export const BridgeCtx = createContext<BridgeInterface>({
  fxPortalClient: undefined,
  rootToken: undefined,
  childToken: undefined,
  txHash: "",
  isChecked: false,
  isWithdrawn: false,
  remainingWithdraw: false,
  amountFromDB: "",
  connectedToServer: false,
  connectedToMySQL: false,
  connectedToBlockchain: false,
  addTxToDB: () => undefined,
  getLatestTx: () => undefined,
  setTxHash: () => undefined,
  modifyIsWithdraw: () => undefined,
  setIsChecked: () => undefined,
  setIsWithdrawn: () => undefined,
  setRemainingWithdraw: () => undefined,
  setAmountFromDB: () => undefined,
});
