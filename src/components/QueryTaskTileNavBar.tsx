import { getId } from "@uifabric/utilities";
import React from "react";
import { Stack, ActionButton, TooltipHost, TooltipOverflowMode } from "office-ui-fabric-react";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { IQuery } from "../state";

interface IQueryTaskListNavBarProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

export const QueryTaskListNavBar = (props: IQueryTaskListNavBarProps): JSX.Element => {
  const { query } = props;
  const iconProps = { back: { iconName: "Back" }, edit: { iconName: "Edit" } };
  const iconSize = { icon: { fontSize: 22 } };
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const tooltipId = getId("text-tooltip");
  const calloutGapSpace = { gapSpace: 0 };
  return (
    <Stack
      horizontal
      horizontalAlign="space-around"
      verticalAlign="center"
      className={QueryTaskClassNames.topBar}
    >
      <ActionButton
        iconProps={iconProps.back}
        styles={iconSize}
        //TODO Add onClick functionality
      />
      <TooltipHost
        calloutProps={calloutGapSpace}
        content={query.name}
        id={tooltipId}
        overflowMode={TooltipOverflowMode.Parent}
        onTooltipToggle={(isTooltipVisible: boolean) => toggleTooltip(!isTooltipVisible)}
      >
        <a
          href={query.url}
          target="_blank"
          className={QueryTaskClassNames.queryTitle}
          aria-labelledby={isTooltipVisible ? tooltipId : undefined}
        >
          {query.name}
        </a>
      </TooltipHost>
      <ActionButton
        iconProps={iconProps.edit}
        styles={iconSize}
        //TODO Add onClick functionality
      />
    </Stack>
  );
};
