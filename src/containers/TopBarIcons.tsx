import * as React from "react";
import {
  Image,
  IImageProps,
  ImageFit,
  Stack,
  Link,
  CommandBarButton,
  Text
} from "office-ui-fabric-react";
import { logout, editQuery, IQuery } from "../state";
import { connect } from "react-redux";
import {
  topBarItemGap,
  TopBarIconsUIClassNames,
  getMenuIconName,
  menuIconSize
} from "../components/TopBarIconsStyles";

interface ITopBarIconsProps {
  logout: () => void;
  editQuery: (query: IQuery) => void;
}

function TopBarIconsView(props: ITopBarIconsProps) {
  const imageProps: IImageProps = {
    src: "GlitterboxLogo2.png",
    imageFit: ImageFit.centerContain,
    maximizeFrame: true,
    width: 80,
    height: 80
  };

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
        key: "edit queries",
        name: "Edit Queries",
        iconProps: {
          iconName: "Edit"
        },
        onClick: () => {}
      },
      {
        key: "sign out",
        name: "Sign Out",
        iconProps: {
          iconName: "SignOut",
          onClick: props.logout
        }
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
  logout,
  editQuery
};

export const TopBarIcons = connect(
  undefined,
  action
)(TopBarIconsView);
