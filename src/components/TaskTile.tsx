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

/**
 * interface for the props read in to the TaskTile function
 *
 * @interface
 */

/**
 * @property { IQuery } item
 * represents a single IQuery to be rendered
 */
interface IRenderTileProps {
  item: IQuery;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const TaskTile = (props: IRenderTileProps): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  return (
    <DefaultButton
      href="https://github.com"
      target="_blank"
      className={TaskTileClassNames.listGridExampleTile}
    >
      <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
        <TooltipHost
          content={props.item.name}
          calloutProps={calloutGapSpace}
          overflowMode={TooltipOverflowMode.Parent}
          onTooltipToggle={(isTooltipVisible: boolean) => toggleTooltip(!isTooltipVisible)}
        >
          <Text
            className={TaskTileClassNames.listGridQueryName}
            nowrap
            block
            aria-labelledby={isTooltipVisible ? tooltipId : undefined}
          >
            {props.item.name}
          </Text>
        </TooltipHost>
        <Text className={TaskTileClassNames.listGridElmCount}>{props.item.tasks.length}</Text>
      </Stack>
    </DefaultButton>
  );
};
