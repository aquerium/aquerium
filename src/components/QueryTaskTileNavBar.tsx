import { getId } from "@uifabric/utilities";
import React from "react";
import {
  Stack,
  ActionButton,
  Text,
  TooltipHost,
  TooltipOverflowMode
} from "office-ui-fabric-react";
import { QueryTaskClassNames } from "./QueryTaskList.ClassNames";
import { IQuery } from "../state";

interface IQueryTaskListNavBarProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

export const QueryTaskListNavBar = (props: IQueryTaskListNavBarProps): JSX.Element => {
  const { query } = props;
  const iconProps = { back: { iconName: "Back" }, edit: { iconName: "Edit" } };
  const iconSize = { icon: { fontSize: 22 } };

  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <ActionButton
        iconProps={iconProps.back}
        styles={iconSize}
        //Add onClick functionality
      />
      <TooltipHost
        calloutProps={calloutGapSpace}
        content={query.name}
        overflowMode={TooltipOverflowMode.Parent}
        onTooltipToggle={tooltipToggle}
        id={tooltipId}
      >
        <Text
          className={QueryTaskClassNames.queryTitle}
          nowrap
          block
          aria-labelledby={isTooltipVisible ? tooltipId : undefined}
        >
          {query.name}
        </Text>
      </TooltipHost>
      <ActionButton
        iconProps={iconProps.edit}
        styles={iconSize}
        //Add onClick functionality
      />
    </Stack>
  );
};
