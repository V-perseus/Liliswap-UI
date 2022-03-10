import Head from "next/head";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import Script from "next/script";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { DemonzWeb3Ctx } from "../contexts/demonzWeb3Context";
import Constants from "../constants/constants";
import L1_LLTH_ARTIFACT from "../artifacts/LLTH_L1.json";
import L2_LLTH_ARTIFACT from "../artifacts/LLTH_L2.json";
import Web3 from "web3";
import { getSpawnVersion } from "../utils/demonzWeb3";
import Wheel from "../artifacts/Wheel.json";
import { use } from "@maticnetwork/maticjs";
import Web3ClientPlugin from "@maticnetwork/maticjs-web3";
import { FxPortalPlugin, FxPortalClient } from "@maticnetwork/maticjs-fxportal";
import { fxPortalClientInit } from "../utils/demonzWeb3";
import Axios from "axios";
import { BridgeCtx } from "../contexts/bridgeContext";
import { escape } from "sqlstring";
import io from "socket.io-client";

declare let window: any;
declare let ethereum: any;
use(Web3ClientPlugin);
use(FxPortalPlugin);

var socket = io(Constants.SERVER_URL);

function MyApp({ Component, pageProps }: AppProps) {
  // web3 hooks
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const [L1_LLTH, setL1_LLTH] = useState(undefined);
  const [L2_LLTH, setL2_LLTH] = useState(undefined);
  const [spawn, setSpawn] = useState(0); // if player owns any Spawn version (0 - Non-holder, 1 - Spawn1, 2 - Spawn2)
  const [contractWheel, setContractWheel] = useState(undefined);

  // bridge hooks
  const [fxPortalClient, setFxPortalClient] = useState(fxPortalClientInit);
  const [rootToken, setRootToken] = useState(undefined);
  const [childToken, setChildToken] = useState(undefined);
  const [txHash, setTxHash] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [remainingWithdraw, setRemainingWithdraw] = useState(false);
  const [amountFromDB, setAmountFromDB] = useState("");

  // verify connection
  const [connectedToServer, setConnectedToServer] = useState(false);
  const [connectedToMySQL, setConnectedToMySQL] = useState(false);
  const [connectedToBlockchain, setConnectedToBlockchain] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnectedToServer(true);
    });
    socket.on("disconnect", () => {
      setConnectedToServer(false);
    });
    socket.on("mySQLConnect", (receivedData) => {
      setConnectedToMySQL(receivedData);
    });
  }, []);

  useEffect(() => {
    if (accounts.length > 0) setConnectedToBlockchain(true);
    else setConnectedToBlockchain(false);
  }, [accounts]);

  useEffect(() => {
    requestAccounts();
    if (window.ethereum) {
      const init = async () => {
        if (typeof window !== "undefined") {
          const web3: any = new Web3(window.ethereum);
          const L1_LLTH = new web3.eth.Contract(
            L1_LLTH_ARTIFACT,
            Constants.L1_LLTH_ADDRESS
          );
          const L2_LLTH = new web3.eth.Contract(
            L2_LLTH_ARTIFACT,
            Constants.L2_LLTH_ADDRESS
          );
          const contractWheel = new web3.eth.Contract(
            Wheel,
            Constants.WHEEL_ADDRESS
          );

          setWeb3(web3);
          setL1_LLTH(L1_LLTH);
          setL2_LLTH(L2_LLTH);
          setContractWheel(contractWheel);
        }
      };

      init();
    }
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accs);
      if (accs.length > 0) {
        setConnected(true);
        if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
          const spawn = await getSpawnVersion(accs[0]);
          setSpawn(spawn);
        }
      } else setConnected(false);
    }
    else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  const switchNetworkToETH = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Constants.CHAIN_ID_ETH }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Constants.CHAIN_ID_ETH,
                  chainName: "Ethereum",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: [Constants.RPC_ETH],
                  blockExplorerUrls: ["https://etherscan.io"],
                  iconUrls: [""],
                },
              ],
            });
          } catch (addError) {
            console.log("Did not add network");
          }
        }
      }
    }
  };

  const switchNetworkToPolygon = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Constants.CHAIN_ID_POLYGON }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Constants.CHAIN_ID_POLYGON,
                  chainName: "POLYGON",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: [Constants.RPC_POLYGON],
                  blockExplorerUrls: ["https://polygonscan.com/"],
                  iconUrls: [""],
                },
              ],
            });
          } catch (addError) {
            console.log("Did not add network");
          }
        }
      }
    }
  };

  const requestAccounts = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      const accs = await window.ethereum
        .request({
          method: "eth_accounts",
        })
        .catch((err: Error) => {
          console.error(err);
        });

      setAccounts(accs);

      if (accs.length > 0) {
        setConnected(true);
        if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
          const spawn = await getSpawnVersion(accs[0]);
          //console.log("SPAWN", spawn);
          setSpawn(spawn);
        }
      } else setConnected(false);
    }
    else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");
    }
  };

  const addLLTH = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
        await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: Constants.L1_LLTH_ADDRESS,
                symbol: "LLTH",
                decimals: 18,
                image: "/lilithswap_flat.png",
              },
            },
          })
          .then((success: any) => {
            if (success) {
              console.log("LLTH successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } else {
        switchNetworkToETH();
      }
    }
  };

  const addxLLTH = async () => {
    if (window.ethereum && window.ethereum.isConnected) {
      if (window.ethereum.networkVersion === Constants.CHAIN_ID_POLYGON_DEC) {
        await ethereum
          .request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: Constants.L2_LLTH_ADDRESS,
                symbol: "xLLTH",
                decimals: 18,
                image: "/lilithswap_flat.png",
              },
            },
          })
          .then((success: any) => {
            if (success) {
              console.log("xLLTH successfully added to wallet!");
            } else {
              throw new Error("Something went wrong.");
            }
          })
          .catch(console.error);
      } else {
        switchNetworkToPolygon();
      }
    }
  };

  useEffect(() => {
    if (window.ethereum && accounts.length > 0) {
      const init = async () => {
        const fxPortalClient: any = new FxPortalClient({
          network: Constants.NETWORK,
          version: Constants.VERSION,
          parent: {
            provider: window.ethereum,
            defaultConfig: {
              from: accounts[0],
            },
          },
          child: {
            provider: Constants.RPC_POLYGON || window.ethereum,
            defaultConfig: {
              from: accounts[0],
            },
          },
          erc20: {
            rootTunnel: Constants.ROOT_TUNNEL,
            childTunnel: Constants.CHILD_TUNNEL,
          },
        });
        await fxPortalClient.init();
        const erc20 = await fxPortalClient.erc20(
          Constants.L1_LLTH_ADDRESS,
          true
        );
        const erc20Child = await fxPortalClient.erc20(
          Constants.L2_LLTH_ADDRESS,
          false
        );

        const escapedAddress = escape(accounts[0]);
        Axios.post(Constants.SERVER_URL + "check", {
          address: escapedAddress,
        }).then(async (response) => {
          if (response.data[0] !== undefined) {
            //console.log(response.data[0].txHash);
            setTxHash(
              response.data[0].txHash.replace("'", "").replace("'", "")
            );
            setIsWithdrawn(response.data[0].isWithdrawn);

            if (response.data[0].isWithdrawn === 0) {
              //switchNetworkToETH();
              setRemainingWithdraw(true);
              setAmountFromDB(
                response.data[0].amount.replace("'", "").replace("'", "")
              );
              console.log(
                await fxPortalClient.isCheckPointed(
                  response.data[0].txHash.replace("'", "").replace("'", "")
                )
              );
              if (
                await fxPortalClient.isCheckPointed(
                  response.data[0].txHash.replace("'", "").replace("'", "")
                )
              )
                setIsChecked(true);
            }
          } else {
            console.log('Failed to connect to /check ');
          }
        });
        setRootToken(erc20);
        setChildToken(erc20Child);
        setFxPortalClient(fxPortalClient);
      };
      init();
    }
  }, [accounts]);

  useEffect(() => {
    getLatestTx(accounts[0]);
  }, [accounts]);

  /*
  useEffect(() => {
    if (window.ethereum.networkVersion === Constants.CHAIN_ID_ETH_DEC) {
      if (txHash && txHash !== "" && !isChecked && fxPortalClient) {
        const check = async () => {
          if (await fxPortalClient.isCheckPointed(txHash)) setIsChecked(true);
        };
        check();
      }
    }
  }, [txHash, fxPortalClient]);*/

  // useEffect(() => {
  //   requestAccounts();
  // }, []);

  const addTxToDB = (
    txHash: string,
    address: string,
    isWithdrawn: number,
    amount: string
  ) => {
    const escapedTxHash = escape(txHash);
    const escapedAddress = escape(address);
    const escapedAmount = escape(amount);
    if (txHash !== "" && address !== "" && isWithdrawn < 1 && amount) {
      Axios.post(Constants.SERVER_URL + "create", {
        txHash: escapedTxHash,
        address: escapedAddress,
        isWithdrawn: isWithdrawn,
        amount: escapedAmount,
      });
    }
  };

  const getLatestTx = (address: string) => {
    const escapedAddress = escape(address);
    Axios.post(Constants.SERVER_URL + "check", {
      address: escapedAddress,
    }).then((response) => {
      if (response.data[0] !== undefined) {
        setTxHash(response.data[0].txHash.replace("'", "").replace("'", ""));
        setIsWithdrawn(response.data[0].isWithdrawn);
        if (response.data[0].isWithdrawn === 0) {
          //switchNetworkToETH();
          setRemainingWithdraw(true);

          setAmountFromDB(
            response.data[0].amount.replace("'", "").replace("'", "")
          );
        }
      }
    })
  };

  const modifyIsWithdraw = (txHash: string) => {
    const escapedTxHash = escape(txHash);
    if (txHash !== "") {
      Axios.post(Constants.SERVER_URL + "update", {
        txHash: escapedTxHash,
      });
    }
  };

  return (
    <DemonzWeb3Ctx.Provider
      value={{
        connected: connected,
        accounts: accounts,
        setAccounts: setAccounts,
        setConnected: setConnected,
        connectMetaMask: connectMetaMask,
        switchNetworkToETH: switchNetworkToETH,
        switchNetworkToPolygon: switchNetworkToPolygon,
        requestAccounts: requestAccounts,
        web3: web3,
        L1_LLTH: L1_LLTH,
        L2_LLTH: L2_LLTH,
        spawn: spawn,
        contractWheel: contractWheel,
        addLLTH: addLLTH,
        addxLLTH,
      }}
    >
      <BridgeCtx.Provider
        value={{
          fxPortalClient: fxPortalClient,
          rootToken: rootToken,
          childToken: childToken,
          txHash: txHash,
          setTxHash: setTxHash,
          isChecked: isChecked,
          isWithdrawn: isWithdrawn,
          addTxToDB: addTxToDB,
          getLatestTx: getLatestTx,
          modifyIsWithdraw: modifyIsWithdraw,
          remainingWithdraw: remainingWithdraw,
          amountFromDB: amountFromDB,
          setIsChecked: setIsChecked,
          setIsWithdrawn: setIsWithdrawn,
          setRemainingWithdraw: setRemainingWithdraw,
          setAmountFromDB: setAmountFromDB,
          connectedToServer: connectedToServer,
          connectedToMySQL: connectedToMySQL,
          connectedToBlockchain: connectedToBlockchain,
        }}
      >
        <html lang="en">
          <Head>
            <title>Lilith Swap</title>

            <meta property="og:title" content="Lilith Swap" />
            <meta property="og:description" content="Decentralized portal that allows gaming, staking NFT's, and a merch store." />
            <meta property="og:image" content="/meta_image.png" />
            <meta property="og:url" content="http://lilithswap.com/" />

            <meta name="twitter:title" content="Lilith Swap" />
            <meta name="twitter:description" content="Decentralized portal that allows gaming, staking NFT's, and a merch store." />
            <meta name="twitter:image" content="/meta_image.png" />
            <meta name="twitter:card" content="summary_large_image" />

            <meta name="description" content="Lilith Swap " />
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
            <link rel="icon" href="/lilithswap_flat.png" />

            <meta
              name="msapplication-TileImage"
              content="/lilithswap_flat.png"
            />
            <meta name="msapplication-TileColor" content="#00CCFF" />

            <link rel="icon" type="image/png" href="/lilithswap_flat.png" />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="144x144"
              href="/lilithswap_flat.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="114x114"
              href="/lilithswap_flat.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="72x72"
              href="/lilithswap_flat.png"
            />
            <link
              rel="apple-touch-icon-precomposed"
              href="/lilithswap_flat.png"
            />
          </Head>

          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></Script>
          <Script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></Script>

          <Navbar />

          <div className="container-fluid justify-content-center flex-column main-container">
            <div className="row">
              <Sidebar />

              <div className="col align-self-center p-0">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
          <Footer />
        </html>
      </BridgeCtx.Provider>
    </DemonzWeb3Ctx.Provider>
  );
}
export default MyApp;
