import type { NextPage } from "next";
import Bounce from "react-reveal/Bounce";
import BridgeModule from "../react-modules/bridge/pages/index";
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { Box } from "grommet";

const Bridge: NextPage = () => {
  return (
    <Bounce>
    
            <BridgeModule />
        
    </Bounce>
  );
};

export default Bridge;
