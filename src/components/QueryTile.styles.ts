import { mergeStyleSets } from "@uifabric/styling";
import { hoveringAndShading } from "./HoveringAndShading.styles";

/**
 * Interface for grid styling.
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
  queryFront: string;
  queryBack: string;
  tileContainer: string;
  basicInfo: string;
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
  tileContainer: { position: "relative", width: 125, height: 125 },
  queryTile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    outline: "none",
    float: "center",
    border: "none"
  },
  queryFront: [
    hoveringAndShading,
    {
      position: "absolute",
      width: "100%",
      height: "100%",
      maxWidth: 125,
      maxHeight: 125,
      background: "#f8f8f8",
      backfaceVisibility: "hidden",
      textAlign: "center",
      opacity: 1,
      selectors: {
        "&:hover": {
          transition: "0.5s ease-in-out",
          animation: "fadeinout linear forwards",
          opacity: 0
        }
      }
    }
  ],
  queryBack: [
    hoveringAndShading,
    {
      position: "absolute",
      width: "100%",
      height: "100%",
      maxWidth: "125px",
      maxHeight: "125px",
      background: "#f8f8f8",
      backfaceVisibility: "hidden",
      opacity: 0,
      selectors: {
        "&:hover": {
          transition: "0.5s ease-in-out",
          animation: "fadeinout linear forwards",
          opacity: 1
        }
      },
      transition: "0.5s ease-in-out",
      textAlign: "left",
      paddingLeft: 4,
      paddingBottom: 20
    }
  ],
  queryName: {
    padding: "20px 0 0 0",
    color: "#323130",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "110px",
    height: "100%",
    fontSize: 15,
    fontFamily: "Segoe UI Light"
  },
  queryTaskCount: {
    fontSize: 48,
    fontFamily: "Segoe UI Light",
    color: "#605e5c"
  },
  basicInfo: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: 200,
    maxHeight: "20px",
    height: "100%",
    fontSize: 10
  }
});
