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
    height: "100%",
    width: "100%",
    overflow: "auto",
    overflowY: "scroll"
  },
  listContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridAutoRows: "1fr",
    gridGap: "8px",
    gridAutoColumns: "8px",
    boxSizing: "border-box",
    padding: 8
  },
  taskTile: [
    hoveringAndShading,
    {
      textAlign: "left",
      outline: "none",
      border: "none",
      background: "#f8f8f8",
      height: "59px",
      paddingLeft: 10,
      paddingTop: 5
    }
  ],
  queryTitle: {
    fontSize: 17,
    color: "#1b3e74",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "200px",
    height: "100%"
  },
  taskTitle: {
    fontSize: 15,
    paddingTop: 3,
    color: "#1b3e74",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "200px",
    height: "100%",
    selectors: {
      "&:hover": { textDecorationLine: "none" }
    }
  },
  basicInfo: {
    overflow: "hidden",
    paddingTop: 5,
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "200px",
    height: "100%",
    fontSize: 12
  },
  infoIcon: {
    padding: 3
  },
  nobull: {
    listStyle: "none"
  }
});
