import { css } from "styled-components";
import { FormClose } from "grommet-icons";

const customTheme = {
  radioButtonGroup: {
    container: {
      gap: 'large',
    },
  },
  radioButton: {
    color: "#562B76",
    check: {
      color: "#562B76",
     
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
        background-image: url("/slider.png");
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
      color: "#562B76",
    },
  },
  global: {
    hover: {
      color: "#2D2102",
    },
    font: {
      family: "Crypto Demonz Large",
    },
    colors: {
      active: "#562B76",
      border: "#000",
      placeholder: "#fff",
      text: "#fff",
    },
    focus: {
      shadow: {
        color: "#33FFFF",
      },
      border: {
        color: "#000",
      },
    },

    drop: {
      background: "#000",
      elevation: "none",

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
