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
      width: "507px",
      height: "95px",
      textAlign: "left",
      outline: "none",
      border: "none",
      background: "#f8f8f8",
      padding: "5px"
    }
  ],
  taskInfoElement: {
    width: "100%",
    height: "57px",
    maxWidth: "470px"
  },
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
      "&:active": { color: "8a3c00", textDecorationLine: "none" }
    },
    width: "100%",
    maxWidth: 420,
    height: "100%"
  },
  titleAndInfoIcon: {
    height: "30px"
  },
  taskTitle: {
    fontSize: 20,
    paddingLeft: 7,
    color: "#1b3e74",
    float: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    textDecorationLine: "none",
    width: "100%",
    maxWidth: 470,
    selectors: {
      "&:hover": { color: "#b64e00" },
      "&:active": { color: "8a3c00" }
    }
  },
  basicInfo: {
    paddingLeft: 7,
    overflow: "hidden",
    float: "left",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "490px",
    fontSize: 14
  },
  infoIcon: {
    position: "relative",
    float: "right",
    transform: "translateY(-100%)",
    height: "30px",
    width: "30px"
  }
});
