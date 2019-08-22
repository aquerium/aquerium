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
import { IQuery, toQueryList, IState } from "../state";
import { connect } from "react-redux";

interface IRenderTileProps {
  /** A single IQuery to be rendered. */
  currQuery: IQuery;
  /** Action creator that sends user to queryListUI */
  toQueryList: (query: IQuery) => void;
}

const gridStackStyle = {
  root: { maxWidth: "100%" }
};

export const QueryTileView = (props: IRenderTileProps): JSX.Element => {
  function toQueryTaskList() {
    props.toQueryList(props.currQuery);
  }
  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  return (
    <DefaultButton className={QueryTileClassNames.queryTile} onClick={toQueryTaskList}>
      <Stack horizontalAlign="center" verticalAlign="space-evenly" styles={gridStackStyle}>
        <TooltipHost
          calloutProps={calloutGapSpace}
          content={props.currQuery.name}
          overflowMode={TooltipOverflowMode.Parent}
          onTooltipToggle={tooltipToggle}
        >
          <Text
            className={QueryTileClassNames.queryName}
            nowrap
            block
            aria-labelledby={isTooltipVisible ? tooltipId : undefined}
          >
            {props.currQuery.name}
          </Text>
        </TooltipHost>
        <Text className={QueryTileClassNames.queryTaskCount}>
          {props.currQuery.tasks.length.toString()}
        </Text>
      </Stack>
    </DefaultButton>
  );
};

const action = {
  toQueryList
};

export const QueryTile = connect(
  undefined,
  action
)(QueryTileView);
