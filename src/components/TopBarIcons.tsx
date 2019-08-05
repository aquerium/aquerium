import * as React from "react";
import {
  Image,
  IImageProps,
  ImageFit,
  Stack,
  Link,
  Text,
  CommandBarButton
} from "office-ui-fabric-react";

const TopBarIcons = () => {
  const imageProps: IImageProps = {
    src: "GlitterboxLogo2.png",
    imageFit: ImageFit.centerContain,
    maximizeFrame: true,
    width: 50,
    height: 50
  };

  const getMenuItems = () => {
    return [
      {
        key: "sign out",
        name: "Sign Out",
        iconProps: {
          iconName: "SignOut"
        },
        onClick: () => {}
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
    <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 20 }}>
      <Link
        href="https://github.com"
        target="_blank"
        styles={{
          root: {
            opacity: 0.7,
            padding: 5
          }
        }}
      >
        <Image {...imageProps as any} title="My GitHub Home" />
      </Link>
      <Text
        styles={{
          root: {
            transform: "translateX(-21%)",
            fontSize: 20,
            color: "#1b3e74"
          }
        }}
      >
        Aquerium
      </Text>
      <CommandBarButton
        menuIconProps={{ iconName: "More" }}
        title="Options"
        styles={{
          root: {
            top: 5,
            right: 10,
            backgroundColor: "rgba(240, 240, 240, 0.7)"
          },
          menuIcon: {
            fontSize: 25,
            color: "#1b374"
            //width: 20,
            //height: 20
          }
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
