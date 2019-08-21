import { mergeStyleSets } from "@uifabric/styling";

export const labels = { childrenGap: 10, maxWidth: 200 };
export const dropdownAndLabels = { childrenGap: 10 };
export const closeButtonHovered = { rootHovered: { background: `#0078d4` } };
export const buttonProps = {
  iconName: "ChromeClose",
  styles: { root: { fontSize: 8, color: "white" } }
};

export const MultiSelectClassNames = mergeStyleSets({
  labelButton: {
    paddingLeft: 5,
    background: "#2b579a",
    selectors: {
      "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
    },
    boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
    borderRadius: "3px",
    transitionDelay: "0.15s",
    transition: "box-shadow .15s linear, transform .15s linear"
  },
  labelText: { fontSize: 14, textOverflow: "ellipsis", overflow: "hidden", color: "white" },
  closeButton: {
    minWidth: 0,
    padding: 0,
    background: "transparent",
    border: "none",
    paddingLeft: 5,
    paddingRight: 5
  }
});
