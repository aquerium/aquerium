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
  /** The styles for the front of the query tile. */
  queryFront: string;
  /** The styles for the back of the query tile (i.e. query details). */
  queryBack: string;
  /** The styles for the list of query details (allows for scrolling without having a scroll bar). */
  infoList: string;
  /** The font size for the query details. */
  basicInfo: string;
  /** The styles for the query name on the back of the query tile. */
  basicInfoQueryLink: string;
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
  queryTile: {
    position: "relative",
    width: "125px",
    height: "125px",
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
      background: "#f8f8f8",
      backfaceVisibility: "hidden",
      textAlign: "center",
      selectors: {
        "&:hover": {
          animation: "fadeinout linear forwards"
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
      background: "#f8f8f8",
      backfaceVisibility: "hidden",
      overflow: "hidden",
      opacity: 0,
      selectors: {
        "&:hover": {
          animation: "fadeinout linear forwards",
          opacity: 1
        }
      },
      transition: "0.5s ease-in-out"
    }
  ],
  infoList: {
    overflowY: "scroll",
    width: "128",
    height: "120",
    padding: 3,
    textAlign: "center"
  },
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
    fontSize: 9
  },
  basicInfoQueryLink: {
    textAlign: "center",
    padding: 3,
    width: "100%",
    maxWidth: 290,
    overflow: "hidden",
    fontSize: 10,
    paddingTop: 3,
    textDecoration: "none",
    selectors: {
      "&:hover": { textDecorationLine: "none" }
    }
  }
});
