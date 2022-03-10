import { useSpring, animated } from "react-spring";
import { ResponsiveContext, Text, Box } from "grommet";
import { Unsorted } from "grommet-icons";
import { ControlCtx } from "../contexts/controlContext";
import { useContext } from "react";
import Image from "next/image";
import arrowsIcon from "../styles/assets/arrows.png";

const SwitchSection = (props: any) => {
  const { turn, setTurn, networkTo, networkFrom } = useContext(ControlCtx);
  const styles = useSpring(
    props.turn
      ? {
          from: { rotateZ: 0 },
          to: { rotateZ: -180 },
        }
      : { from: { rotateZ: -180 }, to: { rotateZ: 0 } }
  );

  return (
    <ResponsiveContext.Consumer>
      {(size: any) => (
        <>
          {size === "large" && (
            <>
              <Box
                gridArea="center"
                direction="column"
                pad="medium"
                align="center"
                justify="center"
                background={{
                  repeat: "no-repeat",
                  size: "contain",
                  image: "url(transfer_1a.png)",
                }}
              >
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text
                    margin={{ top: "40px" }}
                    color="#fff"
                    size="xlarge"
                    weight="bold"
                  >
                    From: {networkFrom}
                  </Text>
                </Box>

                <animated.div style={{ ...styles }}>
                  <div style={{ cursor: "pointer" }}>
                    <Box margin="55px" align="center"></Box>
                  </div>
                </animated.div>
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text
                    margin={{ bottom: "40px" }}
                    color="#fff"
                    size="xlarge"
                    weight="bold"
                  >
                    To: {networkTo}
                  </Text>
                </Box>
              </Box>
            </>
          )}
          {size === "medium" && (
            <>
              <Box
                gridArea="center"
                direction="column"
                pad="medium"
                align="center"
                justify="center"
                background={{
                  repeat: "no-repeat",
                  size: "contain",
                  image: "url(transfer_1a.png)",
                }}
              >
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text
                    margin={{ top: "40px" }}
                    color="#fff"
                    size="xlarge"
                    weight="bold"
                  >
                    From: {networkFrom}
                  </Text>
                </Box>

                <animated.div style={{ ...styles }}>
                  <div style={{ cursor: "pointer" }}>
                    <Box margin="55px" align="center"></Box>
                  </div>
                </animated.div>
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text
                    margin={{ bottom: "40px" }}
                    color="#fff"
                    size="xlarge"
                    weight="bold"
                  >
                    To: {networkTo}
                  </Text>
                </Box>
              </Box>
            </>
          )}
          {size === "small" && (
            <>
              <Box
                fill="horizontal"
                flex
                gridArea="center"
                direction="column"
                align="center"
                justify="center"
                background={{
                  repeat: "no-repeat",
                  size: "contain",
                  image: "url(transfer_1a.png)",
                }}
              >
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text color="#fff" size="medium" weight="bold">
                    From: {networkFrom}
                  </Text>
                </Box>
                <animated.div style={{ ...styles }}>
                  <div style={{ cursor: "pointer" }}>
                    <Box
                      margin={{ top: "50%", left: "40px" }}
                      align="center"
                    ></Box>
                  </div>
                </animated.div>
                <Box
                  width="400px"
                  height="70px"
                  align="center"
                  justify="center"
                >
                  <Text color="#fff" size="medium" weight="bold">
                    To: {networkTo}
                  </Text>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default SwitchSection;
