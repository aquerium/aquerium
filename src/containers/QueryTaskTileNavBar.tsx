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
  function returnQueryURL(): string {
    const str = getQueryURLHTML(props.user, props.query);
    return str;
  }
  const { query } = props;
  const iconProps = { back: { iconName: "Back" }, edit: { iconName: "Edit" } };
  const iconSize = { icon: { fontSize: 22 } };

  const tooltipId = getId("text-tooltip");
  const calloutGapSpace = { gapSpace: 0 };
  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <ActionButton iconProps={iconProps.back} styles={iconSize} onClick={props.toHome} />
      <TooltipHost calloutProps={calloutGapSpace} content={query.name} id={tooltipId}>
        <Link
          href={returnQueryURL()}
          target="_blank"
          className={QueryTaskClassNames.queryTitle}
          nowrap
          block
          aria-labelledby={tooltipId}
        >
          {query.name}
        </Link>
      </TooltipHost>
      <ActionButton iconProps={iconProps.edit} styles={iconSize} onClick={props.toEditQuery} />
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
