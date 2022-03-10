import { useEffect } from "react";

interface TextProps {
  children?: any;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  blurShadow?: Boolean;
  italic?: Boolean;
  letterSpacing?: number;
  className?: string;
  uppercase?: Boolean;
}

const P: React.FC<TextProps> = ({
  children,
  fontSize,
  fontFamily,
  fontWeight,
  color,
  blurShadow,
  letterSpacing,
  italic,
  className,
  uppercase,
}) => {
  useEffect(() => {
    (async () => {
      const WebFont = await import("webfontloader");
      WebFont.load({
        google: {
          families: ["Barlow Condensed", "Khand", "Saira Condensed"],
        },
      });
    })();
  }, []);

  return (
    <p
      className={className ? className : ""}
      style={{
        fontFamily: fontFamily || "Barlow Condensed",
        fontSize: fontSize || "inherit",
        fontWeight: fontWeight || "unset",
        color: color || "#ffffff",
        marginBottom: 0,
        textShadow: blurShadow ? "0px 0px 49px #7a5405" : "unset",
        letterSpacing: letterSpacing || "unset",
        fontStyle: italic ? "italic" : "unset",
        textTransform: uppercase ? "uppercase" : "unset",
      }}
    >
      {children}
    </p>
  );
};

export default P;
