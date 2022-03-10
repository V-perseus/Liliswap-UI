import type { NextPage } from "next";
import Bounce from 'react-reveal/Bounce';
import WheelOfDestiny from "../../../../react-modules/wheel-of-destiny/pages";
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { Box } from "grommet";

const Gaming: NextPage = () => {
  return (
    <Bounce>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 dark-box">
            <WheelOfDestiny />
          </div>
        </div>
      </div>
    </Bounce>
  );
};

export default Gaming;
