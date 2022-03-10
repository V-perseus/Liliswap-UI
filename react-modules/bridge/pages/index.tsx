import { Box } from "grommet";
import { grommet } from "grommet/themes";
import { Grommet, Grid } from "grommet";
import { deepMerge } from "grommet/utils";
import customTheme from "../constants/style";
import ControlPanel from "./controlPanel";

const BridgeModule = () => {
  return (
    <>
      <Grommet
        theme={deepMerge(grommet, customTheme)}
        style={{ backgroundColor: "transparent" }}
      >
        <Grid
          fill={true}
          pad="medium"
          rows={["full"]}
          columns={["auto", "flex", "auto"]}
          gap="small"
          areas={[
            { name: "left", start: [0, 0], end: [0, 0] },
            { name: "center", start: [1, 0], end: [1, 0] },
            { name: "right", start: [2, 0], end: [2, 0] },
          ]}
        >
          <Box gridArea="left" />
          <Box
            className="mainBox"
            direction="column"
            align="center"
            justify="center"
            alignSelf="center"
            gridArea="center"
            gap="medium"
          >
            <ControlPanel />
          </Box>
          <Box gridArea="right" />
        </Grid>
      </Grommet>
    </>
  );
};

export default BridgeModule;
