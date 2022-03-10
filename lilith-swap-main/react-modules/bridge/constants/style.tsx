import { css } from "styled-components";
import { FormClose } from "grommet-icons";

const customTheme = {
  meter: {
    color: "#460104",
  },
  select: {
    icons: {
      color: "#fff",
    },
  },
  checkBox: {
    color: "#562B76",
    icons: {
      checked: FormClose,
    },
  },
  rangeInput: {
    thumb: {
      elevation: "none",
      color: "none",
      extend: css`
        //background-image: url("slider.png");
        height: 27px;
        width: 45px;
      `,
    },
    track: {
      color: "#fff",
    },
  },
  button: {
    border: {
      radius: "4px",
    },
    hover: {
      color: "#22003b",
    },
  },
  global: {
    hover: {
      color: "#000",
      background: "#fff",
    },
    font: {
      family: "Crypto Demonz Large",
    },
    colors: {
      brand: "#000",
      active: "#22003b",
      color: "#000",
      control: "#fff",
      border: "#fff",
      placeholder: "#fff",
      text: "#fff",
    },
    focus: {
      outline: {
        color: "#22003b",
      },
    },
    drop: {
      background: "#000",
      elevation: "none",
      active: "#22003b",
      extend: `
              font-size: 14px;
              border-bottom-left-radius: 1px;
              border-bottom-right-radius: 1px;
              li {
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
              }
              overflow: hidden;
            `,
    },
  },
};

export default customTheme;
