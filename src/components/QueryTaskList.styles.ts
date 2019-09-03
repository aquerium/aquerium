import { mergeStyleSets } from "@uifabric/styling";
import { hoveringAndShading } from "./HoveringAndShading.styles";

/**
 * Defines styles for the various aspects of the QueryTaskList grid.
 */
interface QueryTaskClassNames {
  /** The root container for the entire task list. */
  root: string;
  /** The container/grid for the task tiles. */
  listContainer: string;
  /** The task tile. */
  taskTile: string;
  /** The styles for the title of the query (in NavBar). */
  queryTitle: string;
  /** The styles for the task number, author and date created. */
  basicInfo: string;
  /** The info icon with extra information. */
  infoIcon: string;
}

export const QueryTaskClassNames = mergeStyleSets({
  root: {
    height: "557px",
    width: "100%",
    overflowY: "hidden",
    selectors: {
      "&:hover": { overflowY: "auto" }
    }
  },
  topBar: { height: "43px" },
  listContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridAutoRows: "1fr",
    gridGap: "14px",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "12px 18px 18px 20px"
  },
  taskTile: [
    hoveringAndShading,
    {
      width: "517px",
      textAlign: "left",
      outline: "none",
      border: "none",
      background: "#f8f8f8",
      height: 64,
      paddingLeft: 10,
      paddingTop: 5
    }
  ],
  queryTitle: {
    fontSize: 24,
    color: "#1b3e74",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    textDecorationLine: "none",
    selectors: {
      "&:hover": { color: "#b64e00" },
      "&:active": { color: "8a3c00" }
    },
    width: "100%",
    maxWidth: 420,
    height: "100%"
  },
  taskTitle: {
    fontSize: 20,
    color: "#1b3e74",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    textDecorationLine: "none",
    width: "100%",
    maxWidth: 465,
    selectors: {
      "&:hover": { color: "#b64e00" },
      "&:active": { color: "8a3c00" }
    }
  },
  basicInfo: {
    paddingTop: 5,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: 465,
    fontSize: 14
  },
  infoIcon: {
    padding: 3
  }
});
