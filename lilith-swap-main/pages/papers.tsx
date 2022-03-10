import type { NextPage } from "next";
import Bounce from "react-reveal/Bounce";
import P from "../components/Font/P";

//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Papers: NextPage = () => {
  return (
    <div className="container">
      <Bounce>
        <div className="row justify-content-center">
          <div className="col-lg-3 p-3 text-center">
            <img
              src="/darkpaper.png"
              className="img-fluid"
              alt="Pixelated logo of lilith the queen of the underworld"
            />
            <p className="h1 text-center">
              <P fontSize={20}>Dark Papers</P>
            </p>
          </div>
        </div>
      </Bounce>

      <div className="desktop-papers">
        <Bounce bottom>
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 p-3 text-center dark-box">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#swap">
                    <P fontSize={20}>Lilith Swap</P>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#staking">
                    <P fontSize={20}>Staking</P>
                  </a>
                </li>
              </ul>

              <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade" id="swap">
                  <iframe
                    src="/documents/lilith-swap.pdf"
                    height="1000"
                    width="100%"
                  ></iframe>
                </div>
                <div className="tab-pane fade active show" id="staking">
                  <iframe
                    src="/documents/staking-paper.pdf"
                    height="1000"
                    width="100%"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Bounce>
      </div>

      <div className="mobile-papers">
        <Bounce bottom>
          <div className="row">
            <div className="col-lg-12 p-5 dark-box text-center">
              <p className=" align-middle">
                <P fontSize={20}>
                  Below you will find links to our currently released
                  darkpapers.
                </P>
                <ul className="list-group">
                  <a href="/documents/lilith-swap.pdf">
                    <li className="list-group-item">
                      <P fontSize={20}>Lilith Swap</P>
                    </li>
                  </a>
                  <a href="/documents/staking-paper.pdf">
                    <li className="list-group-item">
                      <P fontSize={20}>Staking</P>
                    </li>
                  </a>
                </ul>
              </p>
            </div>
          </div>
        </Bounce>
      </div>
    </div>
  );
};

export default Papers;
