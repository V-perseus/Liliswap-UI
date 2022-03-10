import { createContext } from "react";

interface ContorlInterface {
  currency: string;
  setCurrency: (value: any) => void;
  networkFrom: any;
  setNetworkFrom: (value: any) => void;
  networkTo: any;
  setNetworkTo: (value: any) => void;
  turn: boolean;
  setTurn: (value: any) => void;
  hasStarted: boolean;
  setHasStarted: (value: any) => void;
  amount: number;
  setAmount: (value: any) => void;
  signNeeded: boolean;
  setSignNeeded: (value: any) => void;
  confirmNeeded: boolean;
  setConfirmNeeded: (value: any) => void;
  size: string;
}

export const ControlCtx = createContext<ContorlInterface>({
  currency: "",
  setCurrency: () => undefined,
  networkFrom: undefined,
  setNetworkFrom: () => undefined,
  networkTo: undefined,
  setNetworkTo: () => undefined,
  turn: false,
  setTurn: () => undefined,
  hasStarted: false,
  setHasStarted: () => undefined,
  amount: 0,
  setAmount: () => undefined,
  signNeeded: false,
  setSignNeeded: () => undefined,
  confirmNeeded: false,
  setConfirmNeeded: () => undefined,
  size: "",
});
