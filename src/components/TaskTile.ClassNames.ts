import { mergeStyleSets } from "@uifabric/styling";

/**
 * interface for grid styling
 *
 * @interface
 */

/**
 * Defines styles for the various aspects of the TaskTile grid
 * @property {string} root
 * @property { string } listContainer
 * @property { string } listGridExampleTile
 * @property { string } listGridQueryName
 * @property { string } listGridElmCount
 */
interface ITaskTile {
  root: string;
  listContainer: string;
  listGridExampleTile: string;
  listGridQueryName: string;
  listGridElmCount: string;
}

export const TaskTileClassNames: ITaskTile = mergeStyleSets({
  root: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    overflowY: "scroll"
  },
  listContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr",
    gridGap: "8px",
    gridAutoColumns: "8px",
    boxSizing: "border-box",
    padding: 8
  },
  listGridExampleTile: {
    textAlign: "center",
    minHeight: "125px",
    width: "125px",
    outline: "none",
    float: "center",
    border: "none",
    selectors: {
      "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
    },
    boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
    borderRadius: "3px",
    transitionDelay: "0.15s",
    transition: "box-shadow .15s linear, transform .15s linear"
  },
  listGridQueryName: {
    color: "#323130",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "110px",
    height: "100%",
    fontSize: 18,
    fontFamily: "Segoe UI Light"
  },
  listGridElmCount: {
    fontSize: 48,
    fontFamily: "Segoe UI Light",
    color: "#605e5c"
  }
});
