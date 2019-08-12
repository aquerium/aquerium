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
 * @property { IQuery } query
 * represents a single IQuery to be rendered
 */
interface IRenderTileProps {
  query: IQuery;
}

export const TaskTile = (props: IRenderTileProps): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  return (
    <DefaultButton
      href="https://github.com"
      target="_blank"
      className={TaskTileClassNames.listGridExampleTile}
      styles={{ root: { background: "rgba(255, 255, 255, 0.5)" } }}
    >
      <Stack
        horizontalAlign="center"
        verticalAlign="space-evenly"
        styles={{ root: { maxWidth: "100%" } }}
      >
        <TooltipHost
          content={props.query.name}
          calloutProps={{ gapSpace: 0 }}
          overflowMode={TooltipOverflowMode.Parent}
          onTooltipToggle={(isTooltipVisible: boolean) => toggleTooltip(!isTooltipVisible)}
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
        <Text className={TaskTileClassNames.listGridElmCount}>{props.query.tasks.length}</Text>
      </Stack>
    </DefaultButton>
  );
};
