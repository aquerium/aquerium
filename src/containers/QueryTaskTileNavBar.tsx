import { getId } from "@uifabric/utilities";
import React from "react";
import { Stack, ActionButton, TooltipHost, Link } from "office-ui-fabric-react";
import { QueryTaskClassNames } from "../components/QueryTaskList.styles";
import { IQuery, toEditQuery, toHome } from "../state";
import { connect } from "react-redux";
import { normalizedURL } from "../util";

interface IQueryTaskListNavBarProps {
  /** A single IQuery to be rendered. */
  query: IQuery;
  /** A function that calls the action to go to the Edit Query UI. */
  toEditQuery: () => void;
  /** A function that calls the action to go to the Home UI. */
  toHome: () => void;
}

function QueryTaskListNavBarView(props: IQueryTaskListNavBarProps) {
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
          href={normalizedURL(query.url)}
          target="_blank"
          rel="noopener noreferrer"
          className={QueryTaskClassNames.queryTitle}
          aria-labelledby={tooltipId}
          nowrap
          block
        >
          {query.name}
        </Link>
      </TooltipHost>
      <ActionButton iconProps={iconProps.edit} styles={iconSize} onClick={props.toEditQuery} />
    </Stack>
  );
}

const action = {
  toEditQuery,
  toHome
};

export const QueryTaskListNavBar = connect(
  undefined,
  action
)(QueryTaskListNavBarView);
