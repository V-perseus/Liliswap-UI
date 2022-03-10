import type { NextPage } from "next";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import LightSpeed from "react-reveal/LightSpeed";
import frameImage from "../public/new/frame_01.png";
import P from "../components/Font/P";
import mockData from "../constants/db";
import useIsTablet from "../hooks/useIsTablet";
import useIsMobile from "../hooks/useIsMobile";
import { Accordion } from "react-bootstrap";
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Content = ({ fade, title, content, className }) => {
  const [isTablet] = useIsTablet();
  const [isMobile] = useIsMobile();
  return (
    <Fade left={true} opposite>
      <div
        className={`col-lg-4 dark-section mb-5  text-center pt-5 ${className}`}
        data-aos="fade-up"
      >
        <div className="dark-section-inner p-4 pt-5">
          <p className="h2 text-center">
            <P uppercase>{title}</P>
          </p>
          <p>
            <P fontFamily="Khand" fontSize={24}>
              {content}
            </P>
          </p>
          {isMobile ? (
            <img src="/new/frame_01_black.png" alt="frame" />
          ) : isTablet ? (
            <img src="/new/frame_wide_black.png" alt="frame" />
          ) : (
            <img src="/new/frame_01_black.png" alt="frame" />
          )}
        </div>
      </div>
    </Fade>
  );
};

const ImageContent = ({ fade, imgUrl, className }) => {
  return (
    <Fade left={true} opposite>
      <div
        className={`col-lg-4 dark-section-img-con text-center ${className}`}
        data-aos="fade-up"
      >
        <img className="dark-section-img" src={imgUrl} alt="frame" />
      </div>
    </Fade>
  );
};

const Home: NextPage = () => {
  return (
    <div className="container-fluid px-0">
      <div className="banner-img-section d-flex align-items-center justify-content-center text-center">
        <div>
          <P fontWeight={800} uppercase fontSize={60}>
            Lilith Swap
          </P>
          <P uppercase fontSize={40}>
            Mother of Defi
          </P>
          <h3>
            <P>Stake Spawn1 For xLLTH</P>
          </h3>
          <a
            href="https://staking.lilithswap.com/"
            className="fancy-button purple-gradient-bg"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <P fontSize={37} fontWeight={600} color={"#000"}>
                Stake Now
              </P>
            </span>
          </a>
        </div>
      </div>
      <div className="roadmap-section"></div>
      <div className="container-fluid">
        <div className="container mt-5">
          <Bounce opposite>
            <div className="row mb-5 pt-4 p-2 align-items-center justify-content-center welcome-message">
              <div className="col-lg-6 my-auto">
                <div className="front-display">
                  <p className="h1 display-4 text-center">
                    <P letterSpacing={3}>
                      Decentralized gaming meets the underworld.
                    </P>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 text-center my-auto">
                <img
                  src="/coin-spin.gif"
                  className="img-fluid float-center"
                  alt="Spinning lilith coin"
                />
              </div>
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </Bounce>
        </div>
        <div className="row mt-5 justify-content-between mb-5">
          <ImageContent
            className={"order-first"}
            fade={"left"}
            imgUrl="/new/framed_image_1.png"
          />
          <ImageContent
            className={"order-lg-1 order-3"}
            fade={"right"}
            imgUrl="/new/framed_image_4.png"
          />
          <ImageContent
            className={"order-lg-2 order-5"}
            fade={"bottom"}
            imgUrl="/new/framed_image_2.png"
          />
          <Content
            className={"order-lg-3 order-2"}
            fade={"left"}
            title={mockData.features.blockchainGaming.title}
            content={mockData.features.blockchainGaming.content}
          />
          <Content
            className={"order-lg-4 order-4"}
            fade={"right"}
            title={mockData.features.theAbyss.title}
            content={mockData.features.theAbyss.content}
          />
          <Content
            className={"order-last"}
            fade={"bottom"}
            title={mockData.features.playToEarn.title}
            content={mockData.features.playToEarn.content}
          />
        </div>
        <div className="row mt-5 justify-content-between mb-5">
          <div className="text-center mb-4">
            <P fontSize={45} fontWeight={800}>
              AS SEEN ON
            </P>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="me-5 text-center">
              <Fade left={true}>
                <a
                  href="https://app.sushi.com/swap?inputCurrency=0x8ab893e33b2cfff425ff9c67b958036c938a2649"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center"
                >
                  <img
                    className="logo-icon-img sushi m-auto"
                    src="/new/sushi-logo.png"
                    alt="sushi-logo"
                  />
                  <P fontSize={30} className="h1" uppercase>
                    sushi
                  </P>
                </a>
              </Fade>
            </div>
            <div className="me-5 text-center">
              <Fade bottom={true}>
                <a
                  href="https://coinmarketcap.com/currencies/lilith-swap/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center"
                >
                  <img
                    className="logo-icon-img coinmarketcap m-auto"
                    src="/new/coinmarketcap-logo.png"
                    alt="coinmarketcap-logo"
                  />
                  <P fontSize={30} className="h1" uppercase>
                    coinmarketcap
                  </P>
                </a>
              </Fade>
            </div>
            <div className="me-5 text-center">
              <Fade top={true}>
                <a
                  href="https://www.coinbase.com/price/lilith-swap"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center"
                >
                  <img
                    className="logo-icon-img coinbase m-auto"
                    src="/new/coinbase-logo.png"
                    alt="coinbase-logo"
                  />
                  <P fontSize={30} className="h1" uppercase>
                    coinbase
                  </P>
                </a>
              </Fade>
            </div>
            <div className="me-5 text-center">
              <Fade right={true}>
                <a
                  href="https://www.coingecko.com/en/coins/lilith-swap"
                  target="_blank"
                  rel="noreferrer"
                  className="text-center"
                >
                  <img
                    className="logo-icon-img coingecko m-auto"
                    src="/new/coingecko-logo.png"
                    alt="coingecko-logo"
                  />
                  <P fontSize={30} className="h1" uppercase>
                    coingecko
                  </P>
                </a>
              </Fade>
            </div>
          </div>
        </div>
        <div className="row mt-5 justify-content-center mb-5">
          <LightSpeed>
            <div className="col-lg-5 quote-box p-3">
              <p className="h4 text-center">
                <P fontSize={40} uppercase>Official Tweets</P>
              </p>
              <hr />
              <a
                className="twitter-timeline"
                data-height="700"
                data-chrome="transparent nofooter noborders noheader noscrollbar"
                data-theme="dark"
                href="https://twitter.com/LilithSwap?ref_src=twsrc%5Etfw"
              >
                <P fontSize={20}>Tweets by CryptoDemonz</P>
              </a>
            </div>
          </LightSpeed>
        </div>
      </div>
    </div>
  );
};

export default Home;
