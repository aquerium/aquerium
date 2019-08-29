import * as React from "react";
import { clearTokenLogout, toEditQuery } from "../state";
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
      <Image {...(imageProps as any)} title="My GitHub Home" />
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
  toEditQuery
};

export const TopBarIcons = connect(
  undefined,
  action
)(TopBarIconsView);
