import * as React from "react";
import { clearTokenLogout, toEditQuery, refreshMap } from "../state";
import { Image, Stack, Link, CommandBarButton, Text, ActionButton } from "office-ui-fabric-react";
import { connect } from "react-redux";
import {
  topBarItemGap,
  TopBarIconsUIClassNames,
  getMenuIconName,
  menuIconSize,
  imageProps,
  refreshIcon,
  refreshIconStyles
} from "./TopBarIcons.styles";

interface ITopBarIconsProps {
  /** A function linked with the action creator to log the user out, which also clears the user's PAT from local storage. */
  clearTokenLogout: () => void;
  /** A function linked with the action creator to send the user to the EditQueryUI. */
  toEditQuery: () => void;
  /** A function linked with the action creator to update the queryMap with the latest information from github. */
  refreshMap: () => void;
}

function TopBarIconsView(props: ITopBarIconsProps) {
  const menuProps = {
    items: [
      {
        key: "add query",
        name: "Add Query",
        iconProps: {
          iconName: "Add"
        },
        onClick: props.toEditQuery
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
      <ActionButton iconProps={refreshIcon} styles={refreshIconStyles} />
      <Link href="https://github.com" target="_blank" className={TopBarIconsUIClassNames.logo}>
        <Image {...(imageProps as any)} title="My GitHub Home" />
      </Link>
      <Text className={TopBarIconsUIClassNames.aquerium}>Aquerium</Text>
      <CommandBarButton
        menuIconProps={getMenuIconName}
        title="Options"
        className={TopBarIconsUIClassNames.menu}
        styles={menuIconSize}
        persistMenu={false}
        menuProps={menuProps}
      />
    </Stack>
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
