export const hoveringAndShading = {
  boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
  borderRadius: "4px",
  transitionDelay: "0.12s",
  transition: "box-shadow .12s linear, transform .12s linear",
  selectors: {
    "&:hover": { boxShadow: "0 6px 10px 2px rgba(0,0,0,.2)" }
  }
};
