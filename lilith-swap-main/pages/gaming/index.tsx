import type { NextPage } from "next";
import Flip from "react-reveal/Flip";
import Bounce from "react-reveal/Bounce";
import Link from "next/link";
import Zoom from "react-reveal/Zoom";
import P from "../../components/Font/P";

//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Gaming: NextPage = () => {
  return (
    <div className="container-fluid justify-content-center">
      <Bounce>
        <div className="row justify-content-center">
          <div className="col-lg-3 p-3 text-center">
            <img
              src="/gaming.png"
              className="img-fluid"
              alt="Pixelated logo of lilith the queen of the underworld"
            />
            <p className="h1 text-center">
              <P fontSize={20}>Gaming Portal</P>
            </p>
          </div>
        </div>
      </Bounce>

      <Bounce bottom>
        <div className="row">
          <div className="col-lg-12 mt-5 mb-5 p-5 dark-box">
            <p className="h2">
              <P fontSize={20}>Gaming</P>
            </p>
            <hr />

            <div className="row mb-5">
              <Zoom top>
                <div className="col-md-2 game-box me-3 p-2 text-center">
                  <Link href="#">
                    <span>
                      <img
                        src="/game-icons/coming-soon.png"
                        className="img-fluid rounded float-center border border-dark"
                        alt="roulette game"
                      />
                      <br />
                      <br />
                      <p className="h5">
                        <P fontSize={20}>Satan&apos;s Cathedral</P>
                      </p>
                    </span>
                  </Link>
                </div>
              </Zoom>
            </div>

            <p className="h2">
              <P fontSize={20}>The Abyss</P>
            </p>
            <hr />

            <div className="row">
              <Zoom top>
                <div className="col-md-2 game-box me-3 p-2 text-center">
                  <div style={{ cursor: "pointer" }}>
                    <Link href="/gaming/the-abyss/wheel-of-destiny">
                      <span>
                        <img
                          src="/game-icons/roulette.png"
                          className="img-fluid rounded float-center border border-dark"
                          alt="roulette game"
                        />
                        <br />
                        <br />
                        <p className="h5">
                          <P fontSize={20}>Wheel of Destiny</P>
                        </p>
                      </span>
                    </Link>
                  </div>
                </div>
              </Zoom>

              <Zoom top>
                <div className="col-md-2 game-box me-3 p-2 text-center">
                  <div style={{ cursor: "pointer" }}>
                    <Link href="#">
                      <span>
                        <img
                          src="/game-icons/coming-soon.png"
                          className="img-fluid rounded float-center border border-dark"
                          alt="roulette game"
                        />
                        <br />
                        <br />
                        <p className="h5">
                          <P fontSize={20}>Black Jack</P>
                        </p>
                      </span>
                    </Link>
                  </div>
                </div>
              </Zoom>

              <Zoom top>
                <div className="col-md-2 game-box me-3 p-2 text-center">
                  <div style={{ cursor: "pointer" }}>
                    <Link href="#">
                      <span>
                        <img
                          src="/game-icons/coming-soon.png"
                          className="img-fluid rounded float-center border border-dark"
                          alt="roulette game"
                        />
                        <br />
                        <br />
                        <p className="h5">
                          <P fontSize={20}>Satan&apos;s Slots</P>
                        </p>
                      </span>
                    </Link>
                  </div>
                </div>
              </Zoom>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
};

export default Gaming;
