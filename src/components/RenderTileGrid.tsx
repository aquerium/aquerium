import React from "react";
import {
  mergeStyleSets,
  Stack,
  Text,
  Button,
  TooltipHost,
  TooltipOverflowMode,
  getId
} from "office-ui-fabric-react";

interface IListGridExampleClassObject {
  listGridExample: string;
  listGridExampleTile: string;
  listGridQueryName: string;
  listGridElmCount: string;
}

export interface IListGridExampleProps {
  items: any[];
}

export const classNames: IListGridExampleClassObject = mergeStyleSets({
  listGridExample: {
    overflow: "hidden",
    background: "#faf9f8",
    fontSize: 0,
    position: "relative",
    height: 272,
    width: 290,
    overflowY: "scroll",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoRows: "1fr",
    gridGap: "8px",
    padding: "8px",
    boxSizing: "border-box"
  },
  listGridExampleTile: {
    background: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    minHeight: "125px",
    width: "125px",
    outline: "none",
    position: "relative",
    float: "center",
    border: "none",
    selectors: {
      "[data-is-editing] &": {
        background: "green"
        // animation: 'isEditing .1s linear infinite alternate'
      },
      "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
    },
    boxShadow: " 0 1.6px 3.6px 0 rgba(0,0,0,.2)",
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

export const RenderTile = (item: any): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  return (
    <Button
      href="https://github.com"
      target="_blank"
      className={classNames.listGridExampleTile}
    >
      <Stack
        horizontalAlign="center"
        verticalAlign="space-evenly"
        styles={{ root: { maxWidth: "100%" } }}
      >
        <TooltipHost
          content={item.name}
          calloutProps={{ gapSpace: 0 }}
          overflowMode={TooltipOverflowMode.Parent}
          onTooltipToggle={(isTooltipVisible: boolean) =>
            toggleTooltip(!isTooltipVisible)
          }
        >
          <Text
            className={classNames.listGridQueryName}
            nowrap
            block
            aria-labelledby={isTooltipVisible ? tooltipId : undefined}
          >
            {item.name}
          </Text>
        </TooltipHost>
        <Text className={classNames.listGridElmCount}>{item.numTasks}</Text>
      </Stack>
    </Button>
  );
};
