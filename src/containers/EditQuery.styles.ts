import { mergeStyleSets } from "@uifabric/styling";

export const rootTokenGap = {
  childrenGap: 14
};

export const EditQueryUIClassNames = mergeStyleSets({
  fieldsRoot: {
    padding: "0px 0px 10px 40px",
    color: "#1b3e74",
    height: "550px",
    width: "100%",
    overflowY: "hidden",
    selectors: {
      "&:hover": { overflowY: "auto" }
    }
  },
  messageBar: {
    width: "100%",
    height: "50px",
    textAlign: "center",
    transform: "translateX(-6px)"
  },
  commandBarContainer: {
    height: "50px",
    textAlign: "center",
    margin: "0 auto"
  }
});
export const commandBarStyles = {
  root: { backgroundColor: "rgba(240, 240, 240, 0.7)" }
};

export const typeOptions = [
  { key: "issue", text: "Only Issues" },
  { key: "pr", text: "Only Pull Requests" },
  { key: "issues and pr", text: "Issues and Pull Requests" }
];

export const reviewStatusOptions = [
  { key: "No reviews", text: "No reviews" },
  { key: "Review required", text: "Review required" },
  { key: "Approved review", text: "Approved review" },
  { key: "Changes requested", text: "Changes requested" },
  { key: "Reviewed by you", text: "Reviewed by you" },
  { key: "Awaiting review from you", text: "Awaiting review from you" },
  { key: "", text: "N/A" }
];
