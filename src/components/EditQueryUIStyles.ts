import { mergeStyleSets } from "@uifabric/styling";

export const rootTokenGap = {
  childrenGap: 5
};

export const actionIcons = {
  back: {
    name: { iconName: "Back" },
    styles: { root: { fontSize: 15 }, icon: { fontSize: 20 } }
  },
  save: {
    name: { iconName: "CheckMark" },
    styles: { root: { color: "green", fontSize: 15 }, icon: { fontSize: 25, color: "green" } }
  },
  remove: {
    name: { iconName: "Trash" },
    styles: { root: { color: "red", fontSize: 15 }, icon: { fontSize: 17, color: "red" } }
  }
};

export const EditQueryUIClassNames = mergeStyleSets({
  root: {
    padding: "2px 0px 2px 5px",
    color: "#1b3e74"
  }
});

export const typeOptions = [
  { key: "issues", text: "Only Issues" },
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
