import React from "react";
import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton
} from "office-ui-fabric-react";
import { TaskTileClassNames } from "./TaskTile.ClassNames";
import { IQuery } from "../state";

interface IRenderTileProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const TaskTile = (props: IRenderTileProps): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <DefaultButton className={TaskTileClassNames.listGridExampleTile}>
      <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
        <TooltipHost
          calloutProps={calloutGapSpace}
          content={props.query.name}
          overflowMode={TooltipOverflowMode.Parent}
          onTooltipToggle={tooltipToggle}
        >
          <Text
            className={TaskTileClassNames.listGridQueryName}
            nowrap
            block
            aria-labelledby={isTooltipVisible ? tooltipId : undefined}
          >
            {props.query.name}
          </Text>
        </TooltipHost>
        <Text className={TaskTileClassNames.listGridElmCount}>
          {props.query.tasks.length.toString()}
        </Text>
      </Stack>
    </DefaultButton>
  );
};
