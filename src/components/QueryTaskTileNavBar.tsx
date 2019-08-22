import { getId } from "@uifabric/utilities";
import React from "react";
import {
  Stack,
  ActionButton,
  Text,
  TooltipHost,
  TooltipOverflowMode,
  Link
} from "office-ui-fabric-react";
import { QueryTaskClassNames } from "./QueryTaskList.styles";
import { IQuery, toEditQuery, toHome, IUserInfo, IState } from "../state";
import { connect } from "react-redux";
import { getQueryURLHTML } from "../util/utilities";

interface IQueryTaskListNavBarProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
  toEditQuery: () => void;
  toHome: () => void;
  user: IUserInfo;
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user
  };
};

export const QueryTaskListNavBarView = (props: IQueryTaskListNavBarProps): JSX.Element => {
  const { query } = props;
  const iconProps = { back: { iconName: "Back" }, edit: { iconName: "Edit" } };
  const iconSize = { icon: { fontSize: 22 } };

  const tooltipId = getId("text-tooltip");
  const [isTooltipVisible, toggleTooltip] = React.useState(false);
  const calloutGapSpace = { gapSpace: 0 };
  const tooltipToggle = (isTooltipVisible: boolean): void => {
    toggleTooltip(!isTooltipVisible);
  };
  function editQuery() {
    props.toEditQuery();
  }
  function returnQueryURL(): string {
    const str = getQueryURLHTML(props.user, props.query);
    console.log(str);
    return str;
  }
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <ActionButton iconProps={iconProps.back} styles={iconSize} onClick={props.toHome} />
      <TooltipHost
        calloutProps={calloutGapSpace}
        content={query.name}
        overflowMode={TooltipOverflowMode.Parent}
        onTooltipToggle={tooltipToggle}
        id={tooltipId}
      >
        <Link
          href={returnQueryURL()}
          target="_blank"
          className={QueryTaskClassNames.queryTitle}
          nowrap
          block
          aria-labelledby={isTooltipVisible ? tooltipId : undefined}
        >
          {query.name}
        </Link>
      </TooltipHost>
      <ActionButton iconProps={iconProps.edit} styles={iconSize} onClick={editQuery} />
    </Stack>
  );
};

const action = {
  toEditQuery,
  toHome
};

export const QueryTaskListNavBar = connect(
  mapStateToProps,
  action
)(QueryTaskListNavBarView);
