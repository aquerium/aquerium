import { mergeStyleSets } from "@uifabric/styling";

/**
 * Takes in a background color for a label and returns the style set
 * for a label so that it resembles a label rendered on the GitHub website.
 * Also considers the contrast/RGB values so that the font inside
 * the label is either white or black.
 * @param token Hexademical color for the label background.
 */
export const gitLabelStyles = (backgroundColor: string) => {
  // Hex to RGB inspired by https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb.
  const rgbResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(backgroundColor);
  const rgbValue = rgbResult
    ? {
        r: parseInt(rgbResult[1], 16),
        g: parseInt(rgbResult[2], 16),
        b: parseInt(rgbResult[3], 16)
      }
    : null;

  // Styles based on inspecting the element on a GitHub label example.
  return mergeStyleSets({
    label: {
      backgroundColor: "#" + backgroundColor,
      // Color contrasting algorithm from https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color.
      color: textColorContrast(rgbValue),
      borderRadius: "2px",
      boxShadow: "inset 0 -1px 0 rgba(27,31,35,.12)",
      fontSize: "12px",
      fontWeight: 600,
      height: "20px",
      lineHeight: "15px",
      padding: ".15em 4px",
      margin: "2px"
    }
  });
};

/**
 * Returns either white or black for a font color, depending on the contrast.
 * @param rgbValue The RGB value of the  background color.
 */
export const textColorContrast = (
  rgbValue: { r: number; g: number; b: number; a?: number } | null
): string => {
  return rgbValue && rgbValue.r * 0.299 + rgbValue.g * 0.587 + rgbValue.b * 0.114 > 186
    ? "#000000"
    : "#ffffff";
};
