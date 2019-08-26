import React from "react";
import { Card } from "@uifabric/react-cards";
import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton,
  ActionButton
} from "office-ui-fabric-react";

import { QueryTileClassNames } from "./QueryTile.styles";
import { IQuery } from "../state";
import { queryList } from "../state/reducers/queryList";

interface IRenderTileProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const QueryTile = (props: IRenderTileProps): JSX.Element => {
  const { query } = props;
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <div className={QueryTileClassNames.tileContainer}>
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
        <Stack className={QueryTileClassNames.queryBack}>
          {/* <Stack.Item> */}
          <Text className={QueryTileClassNames.basicInfo}>
            Types: {query.type ? query.type : "Issues and Pull Requests"}
          </Text>
          {/* </Card.Section> */}
          {/* <Card.Section horizontal> */}
          <ActionButton text={query.name} className={QueryTileClassNames.basicInfo} />
          {/* </Card.Section> */}
          {/* {Object.keys(props.query).map(
            key =>
              key !== "id" &&
              key !== "name" && (
                <Text className={QueryTileClassNames.basicInfo} block key={key}>
                  {key}
                </Text>
              )
          )} */}
        </Stack>
      </DefaultButton>
    </div>
  );
};
