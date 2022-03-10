import type { NextPage } from "next";
import HeadShake from "react-reveal/HeadShake";
import Bounce from "react-reveal/Bounce";
import P from "../components/Font/P";

//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Staking: NextPage = () => {
  return (
    <div className="container">
      <Bounce>
        <div className="row justify-content-center">
          <div className="col-lg-3 p-3 text-center">
            <img
              src="/hammer.png"
              className="img-fluid"
              alt="Pixelated logo of lilith the queen of the underworld"
            />
            <p className="h1 text-center">
              <P fontSize={20}>Work In Progress</P>
            </p>
          </div>
        </div>
      </Bounce>

      <HeadShake>
        <div className="row">
          <div className="col-lg-12 p-5 dark-box text-center">
            <p className="h1 align-middle">
              <P fontSize={20}>Coming Soon!</P>
            </p>
            <p className="mt-5 align-middle">
              <P fontFamily="Khand">
                We are hard at working building out and finalizing the staking
                platform, because we want it to be perfect for you! <br />
                Please check back or follow us on{" "}
                <a href="https://twitter.com/LilithSwap" className="text-info">
                  twitter
                </a>{" "}
                to be notified when staking is up and running!
              </P>
            </p>
          </div>
        </div>
      </HeadShake>
    </div>
  );
};

export default Staking;
