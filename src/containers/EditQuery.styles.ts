import { mergeStyleSets } from "@uifabric/styling";

export const rootTokenGap = {
  childrenGap: 14
};

export const actionIcons = {
  back: {
    name: { iconName: "Back" },
    styles: { root: { fontSize: 20 }, icon: { fontSize: 25, color: "black" } }
  },
  save: {
    name: { iconName: "CheckMark" },
    styles: { root: { color: "green", fontSize: 20 }, icon: { fontSize: 32, color: "green" } }
  },
  remove: {
    name: { iconName: "Trash" },
    styles: { root: { color: "red", fontSize: 20 }, icon: { fontSize: 25, color: "red" } }
  },
  add: {
    name: { iconName: "Add" },
    styles: { root: { color: "green", fontSize: 20 }, icon: { fontSize: 25, color: "green" } }
  },
  update: {
    name: { iconName: "Save" },
    styles: { root: { color: "green", fontSize: 20 }, icon: { fontSize: 25, color: "green" } }
  }
};

export const EditQueryUIClassNames = mergeStyleSets({
  fieldsRoot: {
    padding: "0px 0px 20px 40px",
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
  topBar: { height: "50px" },
  separatorIcon: { fontSize: "26px", background: "rgba(240,240,240,1)" },
  separator: { width: "482px" }
});

export const typeDropdown = {
  subComponentStyles: { label: {}, panel: { root: { height: "118px" } } }
};

export const customizeViewDropdown = {
  subComponentStyles: { label: {}, panel: { root: { height: "334px" } } }
};

export const reviewStatusDropdown = {
  subComponentStyles: { label: {}, panel: { root: { height: "262px" } } }
};

export const customViewsOptions = [
  { key: "type", text: "Type of tasks" },
  { key: "repo", text: "Repo" },
  { key: "assignee", text: "Assignee" },
  { key: "author", text: "Author" },
  { key: "mentions", text: "Mentions" },
  { key: "reviewStatus", text: "Review Status" },
  { key: "labels", text: "Labels" },
  { key: "lastUpdated", text: "Date Last Updated" },
  { key: "createdAt", text: "Date Created" }
];

export const separatorContentStyles = {
  content: { background: "rgba(240,240,240,1)" }
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
