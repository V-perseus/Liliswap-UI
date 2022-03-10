import { Box, ResponsiveContext, Select, Stack, TextInput } from "grommet";
import { Text } from "grommet";
import { ControlCtx } from "../contexts/controlContext";
import { useContext } from "react";
import Image from "next/image";
import selectNetwork from "../styles/assets/select_network.png";

const SelectSection = () => {
  const { currency, setCurrency, setAmount } = useContext(ControlCtx);

  return (
    <ResponsiveContext.Consumer>
      {(size: any) => (
        <>
          {size === "small" && (
            <Box
              gridArea="top"
              align="center"
              direction="column"
              pad={{ left: "5%", right: "5%" }}
            >
              <Stack>
                <Image width={516} height={180} src={selectNetwork} />
                <Box
                  direction="row"
                  gap="medium"
                  pad="5px"
                  margin={{ top: "12.5%", bottom: "15%" }}
                >
                  <Select
                    size="11px"
                    placeholder={currency}
                    options={["LLTH", "xLLTH"]}
                    value={currency}
                    onChange={({ option }) => setCurrency(option)}
                  />

                  <TextInput
                    size="9px"
                    placeholder="Type..."
                    icon={
                      <Text weight="bold" size="xsmall">
                        {currency}
                      </Text>
                    }
                    onChange={(event) => setAmount(event.target.value)}
                    reverse
                  />
                </Box>
              </Stack>
            </Box>
          )}
          {size === "medium" && (
            <Box gridArea="top" align="center" direction="column">
              <Stack>
                <Image width={516} height={144} src={selectNetwork} />
                <Box
                  direction="row"
                  gap="medium"
                  pad="medium"
                  margin={{ top: "20px" }}
                >
                  <Select
                    size="small"
                    placeholder={currency}
                    options={["LLTH", "xLLTH"]}
                    value={currency}
                    onChange={({ option }) => setCurrency(option)}
                  />

                  <TextInput
                    size="small"
                    placeholder="amount"
                    icon={
                      <Text weight="bold" size="xsmall">
                        {currency}
                      </Text>
                    }
                    onChange={(event) => setAmount(event.target.value)}
                    reverse
                  />
                </Box>
              </Stack>
            </Box>
          )}
          {size === "large" && (
            <Box gridArea="top" align="center" direction="column">
              <Stack>
                <Image width={516} height={144} src={selectNetwork} />
                <Box
                  direction="row"
                  gap="medium"
                  pad="medium"
                  margin={{ top: "20px" }}
                >
                  <Select
                    size="small"
                    placeholder={currency}
                    options={["LLTH", "xLLTH"]}
                    value={currency}
                    onChange={({ option }) => setCurrency(option)}
                  />

                  <TextInput
                    size="small"
                    placeholder="amount"
                    icon={
                      <Text weight="bold" size="xsmall">
                        {currency}
                      </Text>
                    }
                    onChange={(event) => setAmount(event.target.value)}
                    reverse
                  />
                </Box>
              </Stack>
            </Box>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default SelectSection;
