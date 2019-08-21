import { mergeStyleSets } from "@uifabric/styling";
import { hoveringAndShading } from "./HoveringAndShadingSyles";

/**
 * Interface for grid styling
 *
 * @interface
 */
interface ITaskTile {
  /** Root container for the grid of queries. */
  root: string;
  /** Grid of queries. */
  listContainer: string;
  /** A single tile for a query. */
  listGridExampleTile: string;
  /** The styles for the query title. */
  listGridQueryName: string;
  /** The styles for the number of tasks assigned to this query. */
  listGridElmCount: string;
}

export const TaskTileClassNames: ITaskTile = mergeStyleSets({
  root: {
    height: "274",
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
  listGridExampleTile: [
    hoveringAndShading,
    {
      textAlign: "center",
      minHeight: "125px",
      width: "125px",
      outline: "none",
      float: "center",
      border: "none",
      background: "#f8f8f8"
    }
  ],
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
