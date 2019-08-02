import React from "react";
import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton
} from "office-ui-fabric-react";
import { classNames } from "./GridStyles";

export const RenderTile = (item: any): JSX.Element => {
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
    </DefaultButton>
  );
};
