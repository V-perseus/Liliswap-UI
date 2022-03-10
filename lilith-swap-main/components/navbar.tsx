import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { DemonzWeb3Ctx } from "../contexts/demonzWeb3Context";
import { useContext } from "react";
import P from "./Font/P";
import useIsTablet from "../hooks/useIsTablet";
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Navbar: NextPage = () => {
  const { connected, connectMetaMask, accounts, addLLTH, addxLLTH } =
    useContext(DemonzWeb3Ctx);
  const [istablet] = useIsTablet();

  return (
    <nav className="navbar navbar-sticky navbar-expand-xl bg-dark navbar-dark top-navbar">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand d-flex align-items-center">
            <img
              src="/new/header_logo_frame.png"
              alt=""
              height="70vh"
              className="d-inline-block align-text-middle position-absolute"
            />
            <img
              src="/lilithswap_flat.png"
              alt=""
              height="70vh"
              className="d-inline-block align-text-middle"
            />
            &nbsp;{" "}
            <P letterSpacing={3} uppercase fontSize={38}>
              Lilith Swap
            </P>
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#top-navbar"
          aria-controls="#top-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-center" id="top-navbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Home
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    About
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/staking">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Staking
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/papers">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Dark Papers
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/store">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Store
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item  border-md-right">
              <Link href="/gaming">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Gaming Portal
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/bridge">
                <a className="nav-link">
                  <P fontSize={20} uppercase>
                    Bridge
                  </P>
                </a>
              </Link>
            </li>

            <li className="nav-item dropdown me-2 ms-2  ">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <P fontSize={20} uppercase>
                  Manage Wallet
                </P>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-sm-end"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" onClick={addLLTH}>
                    <P fontSize={20} uppercase>
                      Add LLTH
                    </P>
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" onClick={addxLLTH}>
                    <P fontSize={20} uppercase>
                      Add xLLTH
                    </P>
                  </a>
                </li>
              </ul>
            </li>

            <br />

            <li className="nav-item me-2 ms-2">
              <div style={{ cursor: "pointer" }}>
                <img
                  src="/new/header_toggle_btn_frame.png"
                  alt=""
                  height="70vh"
                  className="d-inline-block align-text-middle position-absolute"
                  style={{ right: 11, bottom: 21 }}
                />
                {!connected ? (
                  <a
                    className="nav-link metamask-btn"
                    onClick={connectMetaMask}
                  >
                    <P fontSize={18} uppercase>
                      Connect to a wallet
                    </P>
                  </a>
                ) : (
                  <a className="nav-link metamask-btn">
                    <P fontSize={20} uppercase>
                      {accounts[0].substring(0, 6) +
                        "..." +
                        accounts[0].substring(
                          accounts[0].length - 4,
                          accounts[0].length
                        )}
                    </P>
                  </a>
                )}
              </div>
            </li>

            {/* <li className="nav-item dropdown me-2 ms-2">
              <a
                className="nav-link dropdown-toggle "
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-sm-end"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My Account
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Withdrawal
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Deposit
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
      {istablet ? (
        <img className="header-frame" src="/new/header_02.png" alt="frame" />
      ) : (
        <img className="header-frame" src="/new/header_01.png" alt="frame" />
      )}
    </nav>
  );
};

export default Navbar;
