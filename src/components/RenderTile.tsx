import React from "react";
import { connect } from "react-redux";

import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton
} from "office-ui-fabric-react";
import { classNames } from "./GridStyles";
import { IQuery } from "../state";

export const RenderTile = (item: IQuery): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  return (
    <DefaultButton
      href="https://github.com"
      target="_blank"
      className={classNames.listGridExampleTile}
      styles={{ root: { background: "rgba(255, 255, 255, 0.5)" } }}
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
          onTooltipToggle={(isTooltipVisible: boolean) => toggleTooltip(!isTooltipVisible)}
        >
          <Text
            className={classNames.listGridQueryName} //this doesn't matter
            nowrap
            block
            aria-labelledby={isTooltipVisible ? tooltipId : undefined}
          >
            {item.name}
          </Text>
        </TooltipHost>
        <Text className={classNames.listGridElmCount}>{item.numTasks}</Text>
      </Stack>
    </DefaultButton>
  );
};
