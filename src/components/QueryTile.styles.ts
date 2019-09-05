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
  /** The styles for the text telling the user to add a query when there are currently none. */
  addAQuery: string;
  /** The styles for the button that the user selects to add a query when there are currently none. */
  addButton: string;
  /** The styles for the homeUI spinner. */
  spinner: string;
  /** The styles for the back of the query tile (i.e. query details). */
  queryBack: string;
  /** The font size for the query details. */
  basicInfo: string;
  /** The styles for the query name on the back of the query tile. */
  basicInfoQueryName: string;
}

export const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const separatorStyles = {
  root: { background: "transparent", width: "100%", fontSize: 20 }
};

export const QueryTileClassNames: IQueryTile = mergeStyleSets({
  root: {
    height: "550px",
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
    gridGap: "20px",
    gridAutoColumns: "20px",
    boxSizing: "border-box",
    padding: "14px 22px 22px 22px"
  },
  queryTile: {
    position: "relative",
    width: "247px",
    height: "247px"
  },
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
          border: "1px solid #005ba1"
        }
      },
      transition: "0.5s ease-in-out"
    }
  ],
  spinner: {
    textAlign: "center",
    padding: "200px 0",
    color: "#004d7c"
  },
  addButton: {
    width: "60px",
    height: "60px",
    transform: "translate(230px, 230px)",
    background: "transparent"
  },
  addAQuery: {
    fontSize: 24,
    transform: "translate(195px, 230px)",
    color: "#605e5c"
  },
  basicInfo: {
    fontSize: 16,
    paddingBottom: 5,
    display: "inline-block"
  },
  basicInfoQueryName: {
    textAlign: "center",
    bottom: 10,
    width: "100%",
    display: "inline-block",
    fontSize: 24,
    textDecoration: "none",
    color: "#794500",
    selectors: {
      "&:hover": { textDecorationLine: "none" }
    }
  }
});

/**
 * Returns the styles for the front of a given query tile (including the title and count),
 * after calculating if there are most tasks open than the reasonable count and,
 * if so, changing the background of the tile to some shade of red. The shade of red
 * get progressively more intense as the number of open tasks exceeds the reasonable
 * count more and more.
 * @param reasonableCount Reasonable count set for the query by the user.
 * @param numTasksOpen The amount of open tasks open in the query.
 */
export const queryTileFrontStyles = (
  reasonableCount: number,
  numTasksOpen: number,
  markedAsRead: boolean
) => {
  const alphaColor: number = Math.min((numTasksOpen - reasonableCount) / numTasksOpen, 0.7);
  return mergeStyleSets({
    queryTile: [
      hoveringAndShading,
      {
        position: "absolute",
        width: "100%",
        height: "100%",
        background:
          reasonableCount > 0 && numTasksOpen - reasonableCount > 0 && !markedAsRead
            ? "rgba(255, 0, 0, " + alphaColor + ")"
            : "#f8f8f8",
        backfaceVisibility: "hidden",
        textAlign: "center",
        selectors: {
          "&:hover": {
            animation: "fadeinout linear forwards"
          }
        }
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
      color: reasonableCount > 0 && alphaColor > 0.5 && !markedAsRead ? "#ffffff" : "#794500"
    },
    queryTaskCount: {
      fontSize: 80,
      color: reasonableCount > 0 && alphaColor > 0.5 && !markedAsRead ? "#ffffff" : "#004d7c"
    }
  });
};
