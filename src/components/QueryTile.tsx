import React from "react";
import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton
} from "office-ui-fabric-react";
import { QueryTileClassNames } from "./QueryTile.styles";
import { IQuery } from "../state";

interface IRenderTileProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const QueryTile = (props: IRenderTileProps): JSX.Element => {
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <DefaultButton className={QueryTileClassNames.queryTile}>
      <div className={QueryTileClassNames.queryFront}>
        <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
          <TooltipHost
            calloutProps={calloutGapSpace}
            content={props.query.name}
            overflowMode={TooltipOverflowMode.Parent}
            onTooltipToggle={tooltipToggle}
          >
            <Text
              className={QueryTileClassNames.queryName}
              nowrap
              block
              aria-labelledby={isTooltipVisible ? tooltipId : undefined}
            >
              {props.query.name}
            </Text>
          </TooltipHost>
          <Text className={QueryTileClassNames.queryTaskCount}>
            {props.query.tasks.length.toString()}
          </Text>
        </Stack>
      </div>
      <div className={QueryTileClassNames.queryBack}> Hello World </div>
    </DefaultButton>
  );
};
