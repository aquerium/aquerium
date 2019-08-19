import * as React from "react";
import {
  Image,
  IImageProps,
  ImageFit,
  Stack,
  Link,
  CommandBarButton
} from "office-ui-fabric-react";
import { logout, editQuery, IQuery } from "../state";
import { connect } from "react-redux";

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

  const getMenuItems = () => {
    return [
      {
        key: "sign out",
        name: "Sign Out",
        iconProps: {
          iconName: "SignOut"
        },
        onClick: props.logout
      },
      {
        key: "edit queries",
        name: "Edit Queries",
        iconProps: {
          iconName: "Edit"
        },
        onClick: () => {}
      }
    ];
  };

  return (
    <Stack
      horizontal
      verticalAlign="center"
      styles={{
        root: {
          height: "80",
          position: "relative"
        }
      }}
    >
      <Link
        href="https://github.com"
        target="_blank"
        styles={{
          root: {
            position: "absolute",
            left: "50%",
            transform: "translateX(-61%)"
          }
        }}
      >
        <Image {...imageProps as any} title="My GitHub Home" />
      </Link>
      <CommandBarButton
        menuIconProps={{ iconName: "More" }}
        title="Options"
        styles={{
          root: {
            width: 20,
            height: 20,
            background: "#rgba(240,240,240,0)",
            margin: "auto",
            position: "absolute",
            right: 20
          },
          menuIcon: { fontSize: 20, color: "#1b374" }
        }}
        persistMenu={false}
        menuProps={{
          items: getMenuItems(),
          shouldFocusOnMount: true,
          shouldFocusOnContainer: true
        }}
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
