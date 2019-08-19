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

/**
 * @property { IQuery } query represents a single IQuery to be rendered
 */
interface IRenderTileProps {
  title: string;
}

export const QueryTaskListNavBar = (props: IRenderTileProps): JSX.Element => {
  const { title } = props;
  const iconProps = { back: { iconName: "Back" }, edit: { iconName: "Edit" } };
  const iconSize = { icon: { fontSize: 22 } };

  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <Stack horizontal horizontalAlign="center" verticalAlign="center">
      <ActionButton
        iconProps={iconProps.back}
        styles={iconSize}
        //Add onClick functionality
      />
      <TooltipHost
        calloutProps={calloutGapSpace}
        content={title}
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
          {title}
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
