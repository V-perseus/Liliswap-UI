import { Box, Grid, Text, Button } from "grommet";
import { useContext } from "react";
import { DemonzWeb3Ctx } from "../../../contexts/demonzWeb3Context";

const Connect = () => {
  const { connectMetaMask } = useContext(DemonzWeb3Ctx);
  return (
    <Box gap="medium">
      <Box direction="column" background="#fff" height="400px" width="600px">
        <Grid
          fill={true}
          pad="medium"
          rows={["auto"]}
          columns={["full"]}
          gap="small"
          areas={[{ name: "center", start: [0, 0], end: [0, 0] }]}
        >
          <Box
            gridArea="center"
            background="#000"
            direction="column"
            pad="medium"
            align="center"
            justify="center"
          >
            <Button
              label={<Text size="large">CONNECT</Text>}
              onClick={connectMetaMask}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Connect;
