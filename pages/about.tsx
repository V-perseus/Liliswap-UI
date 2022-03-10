import type { NextPage } from "next";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import P from "../components/Font/P";

//import Image from 'next/image'
//import styles from '../styles/Home.module.css'

const About: NextPage = () => {
  return (
    <div className="container">
      <Bounce>
        <div className="row justify-content-center">
          <div className="col-lg-3 p-3 text-center">
            <img
              src="/lilithswap3x.png"
              className="img-fluid"
              alt="Pixelated logo of lilith the queen of the underworld"
            />
            <p className="h1 text-center">
              <P fontSize={20}>About us</P>
            </p>
          </div>
        </div>
      </Bounce>
      <Zoom>
        <div className="row mt-5 justify-content-between">
          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>Crypto Demonz v1</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; The genesis of the Crypto Demonz NFT collections, the
                immortal Spawn1. Originally minted at 0.06ETH, spawned 10,000
                strong. Owning one not only grants you access to our NFT arcade
                series but also access to holder’s rewards such as various types
                of airdrops, staking multiplier advantages, exclusive access to
                other collections, merch and more. Spawn1 Crypto Demonz may be
                offered as sacrifices to Lilith Swap to gain new advantages in
                the ecosystem based on your infernal intentions, fueling our
                deflationary model, making surviving Spawn1’s that much rarer.
              </P>
            </p>
          </div>

          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>Crypto Demonz v2</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; The second phase of our horde, the Crypto Demonz Spawn2
                collection features a more menacing art-style and traits
                befitting its utility within the ecosystem. The Spawn2 offers
                the only way to gain P2E (play-to-earn) ETH rewards in Battle
                Royale, as well as pfp’s tied to leaderboard ranking display.
                Spawn1 holders were allowed to mint these menacing Demonz by
                means of Sacrificing (3) Spawn1 NFT’s to Lilith Swap. 1000/2000
                total supply minted by our loyal holders. The remaining supply
                was forged by the Prince of Darkness himself to tactically sell
                on Secondary markets like OpenSea and to Air Drop for
                holders/giveaways/partnerships over time.
              </P>
            </p>
          </div>
        </div>
      </Zoom>

      <Zoom>
        <div className="row mt-5 justify-content-between">
          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>Lilith Swap</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; Lilith Swap is the baseline ecosystem for a bridge
                between L1 Ethereum Mainnet NFT utility, and L2 Polygon
                Blockchain Gaming… Lilith Swap&apos;s main token LLTH is the
                primary means of exchange within this ecosystem. Lilith Swap
                will host P2E Parlor games, ERC20 Staking pools, defi ecommerce
                for physical merchandise, and most importantly, NFT Staking
                pools and Blockchain Gaming framework that will be available as
                a product/service for other P2E projects.
              </P>
            </p>
          </div>

          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>Staking</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; The CDZ.Staking formula is a simple and devilishly
                effective custom APR build, rewarding all tiers of our Crypto
                Demonz collections along with other collections we deem worthy
                of bathing in our staking pools. A normalizer # is used to apply
                the same APR formula from our Spawn collections, to any other
                external collection that wants to stake for LLTH token in
                exchange for Liquidity Provision and equity in their project to
                be distributed to our community. Spawn1 holders will be
                responsible for the creation of the large part of the LLTH
                tokens in existence over time based on most logical projections
                with their weighted staking APR versus other Spawn tiers, a
                great reward, and a great responsibility lies upon the shoulders
                of Spawn1 OG’s. LLTH will have many use-cases across the
                CryptoDemonz ecosystem.
              </P>
            </p>
          </div>
        </div>
      </Zoom>

      <Zoom>
        <div className="row mt-5 justify-content-between">
          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>Satan&apos;s Cathedral</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; Our first solo-player game, a 3-part sidescroller 80px
                height dungeon game. Satan is not yet King of Hell and is
                instead currently the General of Hell&apos;s armies, he has been
                condemned as a traitor and court-marshaled by Astaroth the
                current King of hell for speaking out against the King publicly
                to a group of Head Demonz. Instead of facing the royal court
                after the news of a court-marshal, Satan heads on his way to
                Astaroth&apos;s Cathedral with the intention of claiming the
                Stronghold for himself and confronting his arch-nemesis
                Astaroth…
              </P>
            </p>
          </div>

          <div className="col-lg-5 p-3 dark-box">
            <p className="h4 text-center">
              <P fontSize={20}>The Abyss</P>
            </p>
            <p>
              <P fontFamily="Khand">
                &nbsp; Hell’s hottest destination for Crypto Demonz NFT holders
                and outsiderz alike, to let off some sulfur and try their hand
                at winning favor & fortunes of LLTH. The Abyss will feature a
                handpicked selection of Satan’s favorite parlor games, animated
                and interactive, such as LLTH Blackjack and the Wheel of
                Destiny, more to be announced. Parlor games in the Abyss will
                give the LLTH token utility even before our sidescroller Satan’s
                Cathedral release, gain us well-deserved exposure through
                liquidity provision on ‘Dexes and set up Spawn1 holders with a
                sustainable, passive APR. Play to earn or play to burn, may
                Lilith’s favor be with you. Tiered, in-game fee reductions exist
                for all Spawn Collections.
              </P>
            </p>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default About;
