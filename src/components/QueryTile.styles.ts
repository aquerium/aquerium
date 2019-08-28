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
  /** The font size for the query details. */
  basicInfo: string;
  /** The styles for the query name on the back of the query tile. */
  basicInfoQueryLink: string;
}

export const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const separatorStyles = {
  root: { background: "transparent", width: "100%", fontSize: 20 }
};

export const QueryTileClassNames: IQueryTile = mergeStyleSets({
  root: {
    height: "557px",
    width: "100%",
    overflow: "hidden",
    selectors: {
      "&:hover": { overflowY: "auto" }
    }
  },
  listContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr",
    gridGap: "19px",
    gridAutoColumns: "19px",
    boxSizing: "border-box",
    padding: "19px"
  },
  queryTile: {
    position: "relative",
    width: "250px",
    height: "250px"
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
      outline: "none",
      float: "center",

      border: "none",
      background: "#f8f8f8",
      backfaceVisibility: "auto",
      overflowY: "auto",
      overflowX: "hidden",
      opacity: 0,
      cursor: "pointer",
      selectors: {
        "&:hover": {
          animation: "fadeinout linear forwards",
          opacity: 1,
          background: "#f8f8f8"
        },
        "&:active": {
          transition: "0.1s",
          border: "2px solid #005ba1"
        }
      },
      transition: "0.5s ease-in-out"
    }
  ],
  queryName: {
    padding: "35px 0 0 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    maxWidth: "240px",
    height: "100%",
    maxHeight: "100px",
    fontSize: 24,
    fontFamily: "Segoe UI Light",
    color: "#794500"
  },
  queryTaskCount: {
    fontSize: 80,
    fontFamily: "Segoe UI Light",
    color: "#004d7c"
  },
  basicInfo: {
    fontSize: 16,
    paddingBottom: 10
  },
  basicInfoQueryLink: {
    textAlign: "center",
    bottom: 10,
    width: "100%",
    maxWidth: 290,
    fontSize: 24,
    textDecoration: "none",
    selectors: {
      "&:hover": { textDecorationLine: "none" }
    }
  }
});
