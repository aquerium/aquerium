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
  /** The styling for the text for labels. */
  labels: string;
  /** Styling for the message that tells the user a query returned empty. */
  noQueries: string;
  /** The styling for the div that holds the query name and GitHub icon. */
  queryNameContainer: string;
  /** The styling for the div that holds the GitHub Icon. */
  githubImage: string;
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
    gridGap: "15px",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "12px 19px 18px 19px"
  },
  taskTile: [
    hoveringAndShading,
    {
      width: "510px",
      height: "94px",
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
      "&:hover": { color: "#b64e00", textDecorationLine: "none" },
      "&:active": { color: "8a3c00", textDecorationLine: "none" }
    },
    width: "100%",
    maxWidth: 380,
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
    maxWidth: 465,
    selectors: {
      "&:hover": { color: "#b64e00" },
      "&:active": { color: "8a3c00" }
    }
  },
  basicInfo: {
    paddingLeft: 7,
    paddingBottom: 3,
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
  },
  labels: {
    paddingLeft: 7,
    overflow: "hidden",
    float: "left",
    width: "100%",
    maxWidth: "490px",
    fontSize: 14
  },
  noQueries: {
    textAlign: "center",
    fontSize: 24,
    transform: "translateY(500%)"
  },
  queryNameContainer: {
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row"
  },
  githubImage: {
    padding: 5,
    transform: "translateY(-20%)"
  }
});
