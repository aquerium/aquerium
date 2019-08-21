export const hoveringAndShading = {
  boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
  borderRadius: "3px",
  transitionDelay: "0.15s",
  transition: "box-shadow .15s linear, transform .15s linear",
  selectors: {
    "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
  }
};
