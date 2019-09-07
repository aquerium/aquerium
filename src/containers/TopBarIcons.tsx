import * as React from "react";
import { clearTokenLogout, toEditQuery, IQuery, refreshMap } from "../state";
import { Image, Stack, CommandBarButton, Text } from "office-ui-fabric-react";
import { connect } from "react-redux";
import {
  topBarItemGap,
  TopBarIconsUIClassNames,
  menuIconSize,
  imageProps,
  refreshIcon,
  refreshIconStyles,
  getMenuIconProps
} from "./TopBarIcons.styles";

interface ITopBarIconsProps {
  /** A function linked with the action creator to log the user out, which also clears the user's PAT from local storage. */
  clearTokenLogout: () => void;
  /** A function linked with the action creator to send the user to the EditQueryUI. */
  toEditQuery: (query?: IQuery) => void;
  /** A function linked with the action creator to update the queryMap with the latest information from github. */
  refreshMap: () => void;
}

function TopBarIconsView(props: ITopBarIconsProps) {

  function onClickToEditQuery() {
    props.toEditQuery();
  };

  const menuProps = {
    items: [
      {
        key: "add query",
        name: "Add Query",
        iconProps: {
          iconName: "Add"
        },
        onClick: onClickToEditQuery
      },
      {
        key: "sign out",
        name: "Sign Out",
        iconProps: {
          iconName: "SignOut"
        },
        onClick: props.clearTokenLogout
      }
    ]
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-around"
      verticalAlign="center"
      tokens={topBarItemGap}
      className={TopBarIconsUIClassNames.topBar}
    >
      <CommandBarButton iconProps={refreshIcon} styles={refreshIconStyles} onClick={props.refreshMap} />
      <Image className={TopBarIconsUIClassNames.logo} {...(imageProps as any)} title="Aquerium" />
      <Text className={TopBarIconsUIClassNames.aquerium}>Aquerium</Text>
      <CommandBarButton
        menuIconProps={getMenuIconProps}
        title="Options"
        className={TopBarIconsUIClassNames.menu}
        styles={menuIconSize}
        persistMenu={false}
        menuProps={menuProps}
      />
    </Stack >
  );
}

const action = {
  clearTokenLogout,
  toEditQuery,
  refreshMap
};

export const TopBarIcons = connect(
  undefined,
  action
)(TopBarIconsView);
