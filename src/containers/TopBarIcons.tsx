import * as React from "react";
import { Image, Stack, Link, CommandBarButton, Text } from "office-ui-fabric-react";
import { logout } from "../state";
import { connect } from "react-redux";
import {
  topBarItemGap,
  TopBarIconsUIClassNames,
  getMenuIconName,
  menuIconSize,
  imageProps
} from "../components/TopBarIconsStyles";

interface ITopBarIconsProps {
  logout: () => void;
}

function TopBarIconsView(props: ITopBarIconsProps) {
  /**
   * TODO:
   * Add onClick functionality to add/edit query.
   */
  const getMenuItems = [
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
      onClick: props.logout
    }
  ];

  const menuProps = {
    items: getMenuItems
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
  logout
};

export const TopBarIcons = connect(
  undefined,
  action
)(TopBarIconsView);
