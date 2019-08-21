import { mergeStyleSets } from "@uifabric/styling";
import { hoveringAndShading } from "./HoveringAndShadingSyles";

/**
 * Interface for grid styling
 *
 * @interface
 */
interface IQueryTile {
  /** Root container for the grid of queries. */
  root: string;
  /** Grid of queries. */
  listContainer: string;
  /** A single tile for a query. */
  queryTile: string;
  /** The styles for the query title. */
  queryName: string;
  /** The styles for the number of tasks assigned to this query. */
  queryTaskCount: string;
}

export const QueryTileClassNames: IQueryTile = mergeStyleSets({
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
  queryTile: [
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
  queryName: {
    color: "#323130",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "110px",
    height: "100%",
    fontSize: 18,
    fontFamily: "Segoe UI Light"
  },
  queryTaskCount: {
    fontSize: 48,
    fontFamily: "Segoe UI Light",
    color: "#605e5c"
  }
});
