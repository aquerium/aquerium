import * as React from "react";
import { clearTokenLogout } from "../state";
import { Image, Stack, Link, CommandBarButton, Text } from "office-ui-fabric-react";
import { connect } from "react-redux";
import {
  topBarItemGap,
  TopBarIconsUIClassNames,
  getMenuIconName,
  menuIconSize,
  imageProps
} from "../components/TopBarIcons.styles";

interface ITopBarIconsProps {
  /** A function linked with the action creator to log the user out, which also clears the user's PAT from local storage. */
  clearTokenLogout: () => void;
}

function TopBarIconsView(props: ITopBarIconsProps) {
  const menuProps = {
    items: [
      {
        key: "add query",
        name: "Add Query",
        iconProps: {
          iconName: "Add"
        }
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
    <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={topBarItemGap}>
      <Link href="https://github.com" target="_blank" className={TopBarIconsUIClassNames.logo}>
        <Image {...imageProps as any} title="My GitHub Home" />
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
  clearTokenLogout
};

export const TopBarIcons = connect(
  undefined,
  action
)(TopBarIconsView);
