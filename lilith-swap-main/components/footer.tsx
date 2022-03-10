import type { NextPage } from "next";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import { useEffect } from "react";
import useIsTablet from "../hooks/useIsTablet";
import P from "./Font/P";

//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const Footer: NextPage = () => {
  const [isTablet] = useIsTablet();
  const [isMobile] = useIsMobile();

  useEffect(() => {
    console.log(isTablet);
  }, [isTablet]);

  return (
    <Fade opposite>
      <footer className="text-center text-white mt-5">
        <div className="container-fluid p-4">
          <div className="container">
            <section className="mb-4 mt-5">
              <a
                className="btn btn-floating m-1"
                href="https://twitter.com/lilithswap"
                role="button"
              >
                <Image src="/twitter.png" width={40} height={40} />
              </a>

              <a
                className="btn btn-floating m-1"
                href="https://github.com/orgs/Cryptodemonz-Github"
                role="button"
              >
                <Image src="/github.png" width={40} height={40} />
              </a>

              <a
                className="btn btn-floating m-1"
                href="https://cryptodemonz.com/"
                role="button"
              >
                <Image src="/website.png" width={40} height={40} />
              </a>
            </section>

            <section className="mb-4">
              <p>
                <em>
                  <P fontSize={23}>
                    First Video Game NFT Arcade Series on the Ethereum
                    blockchain with over 10,000 unique NFTs.
                  </P>
                </em>
              </p>
            </section>

            <section className="">
              <div className="row">
                <div className="col-lg-4 mb-4 mb-md-0">
                  <p className="h4">
                    <P letterSpacing={4} uppercase>
                      Website
                    </P>
                  </p>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link href="https://cryptodemonz.com">
                        <a className="text-white">
                          <P fontSize={23} letterSpacing={1}>
                            Crypto Demonz
                          </P>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4 mb-4 mb-md-0">
                  <p className="h4">
                    <P letterSpacing={4} uppercase>
                      Gaming
                    </P>
                  </p>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link href="/gaming">
                        <a className="text-white">
                          <P fontSize={23} letterSpacing={1}>
                            Gaming Hub
                          </P>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/gaming#the-abyss">
                        <a className="text-white">
                          {" "}
                          <P fontSize={23} letterSpacing={1}>
                            The Abyss
                          </P>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/gaming#satans-cathedral">
                        <a className="text-white">
                          <P fontSize={23} letterSpacing={1}>
                            Satan&apos;s Cathedral
                          </P>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-4  mb-4 mb-md-0">
                  <p className="h4">
                    <P letterSpacing={4} uppercase>
                      Dark Papers
                    </P>
                  </p>

                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link href="/documents/staking-paper.pdf">
                        <a href="" className="text-white">
                          <P fontSize={23} letterSpacing={1}>
                            Staking
                          </P>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/documents/lilith-swap.pdf">
                        <a className="text-white">
                          <P fontSize={23} letterSpacing={1}>
                            Lilith Swap
                          </P>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="">
              <div className="row">
                <div className="col-12">
                  <div className="text-center text-muted p-3 ">
                    <Link href="https://cryptodemonz.com/">
                      <a className="text-muted">
                        <P fontSize={20}>
                          Crypto Demonz &copy; {new Date().getFullYear()} &nbsp;{" "}
                        </P>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {isMobile ? (
          <img
            className="footer-frame"
            src="/new/footer_04.png"
            alt="footer-frame"
          />
        ) : isTablet ? (
          <img
            className="footer-frame"
            src="/new/footer_02.png"
            alt="footer-frame"
          />
        ) : (
          <img
            className="footer-frame"
            src="/new/footer_01.png"
            alt="footer-frame"
          />
        )}
      </footer>
    </Fade>
  );
};

export default Footer;
