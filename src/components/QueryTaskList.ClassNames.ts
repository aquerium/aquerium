import { mergeStyleSets } from "@uifabric/styling";
import { hoveringAndShading } from "./HoveringAndShadingSyles";

/**
 * Defines styles for the various aspects of the QueryTaskList grid
 * @property {string} root
 * @property { string } listContainer
 * @property { string } taskTile
 * @property { string } queryTitle
 * @property { string } basicInfo
 * @property { string } infoIcon
 */
interface QueryTaskClassNames {
  root: string;
  listContainer: string;
  taskTile: string;
  queryTitle: string;
  basicInfo: string;
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
      height: "50px",
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
    color: "#1b3e74",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "250",
    height: "100%"
  },
  basicInfo: {
    color: "#323130",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    height: "100%",
    fontSize: 12,
    fontFamily: "Segoe UI Light"
  },
  infoIcon: {
    padding: 3
  }
});
