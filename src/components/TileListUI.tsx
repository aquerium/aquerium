import React from "react";
//import { RenderTile } from "./RenderTile";
import { classNames } from "./GridStyles";
//import { items } from "./HomeUI";//items is an array, we don't want it
import { connect } from "react-redux";
import { IState, IQuery } from "../state/state.types";

import {
  Stack,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  getId,
  DefaultButton
} from "office-ui-fabric-react";

interface IQueryList {
  queryList: { [key: string]: IQuery };
}

function TileList_UI(props: IQueryList) {
  return (
    <div className={classNames.root}>
      <div className={classNames.listContainer}>
        {Object.keys(props.queryList).map(item => RenderTile(props.queryList[item]))}
      </div>
    </div>
  ); //each item should have an internal number
}

const mapStateToProps = (state: IState) => ({
  queryList: state.queryList
  //here we only care about the querylist in state
});

function RenderTile(item: IQuery) {
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
}

export const TileListUI = connect(mapStateToProps)(TileList_UI);
