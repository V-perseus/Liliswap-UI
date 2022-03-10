import React, { useContext, useEffect } from "react";
import "../styles/Home.module.css";
import { AppCtx } from "../contexts/appContext";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";
import { ConnectButton, SpinButton } from "../demonzUIKit/elements";
import Constants from "../../../constants/constants";
 

declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

function BottomButtons() {
  const { placedBet, setIsTxModalOpen, setStartSpin, startSpin } =
    useContext(AppCtx);
  const { connected, connectMetaMask, switchNetworkToPolygon } = useContext(DemonzWeb3Ctx);

  useEffect(() => {
    switchNetworkToPolygon();
  }, []);

  return (
    <>
      {placedBet ? (
        <>
          {!startSpin /* && !isEnded */ ? (
            <div className="spin">
              <SpinButton height="80px" onClick={() => setStartSpin(true)} />
            </div>
          ) : (
            <SpinButton height="80px" />
          )}
        </>
      ) : (
        <>
          {connected ? (
            <div>
              <SpinButton
                height="80px"
                onClick={() => setIsTxModalOpen(true)}
              />
            </div>
          ) : (
            <ConnectButton height="80px" onClick={connectMetaMask} />
          )}
        </>
      )}
    </>
  );
}

export default BottomButtons;
