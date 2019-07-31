import * as React from "react";
import {
  Image,
  IImageProps,
  ImageFit,
  Stack,
  Link,
  CommandBarButton
} from "office-ui-fabric-react";
import { HomeUIContext } from "./HomeUIContext";

const TopBarIcons = () => {
  const imageProps: IImageProps = {
    src: "GlitterboxLogo2.png",
    imageFit: ImageFit.centerContain,
    maximizeFrame: true,
    width: 80,
    height: 80
  };

  const { isEditing, setEditing } = React.useContext(HomeUIContext);

  const getMenuItems = () => {
    return [
      {
        key: "sign out",
        name: "Sign Out",
        iconProps: {
          iconName: "SignOut"
        }
      },
      {
        key: "edit queries",
        name: "Edit Queries",
        iconProps: {
          iconName: "Edit"
        },
        onclick: () => {
          setEditing(!isEditing);
        }
      }
    ];
  };

  return (
    <Stack
      horizontal
      verticalAlign="center"
      styles={{
        root: {
          background: "#faf9f8",
          width: "290px",
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
            width: 24,
            height: 24,
            background: "#faf9f8",
            margin: "auto",
            position: "absolute",
            right: "20px"
          },
          menuIcon: { fontSize: 24, color: "#1b374" }
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
};

export default TopBarIcons;
