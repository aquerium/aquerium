import { mergeStyleSets } from "@uifabric/styling";
import { IImageProps, ImageFit } from "office-ui-fabric-react";

export const imageProps: IImageProps = {
  src: "GlitterboxLogo2.png",
  imageFit: ImageFit.centerContain,
  maximizeFrame: true,
  width: 40,
  height: 40
};

export const getMenuItems = [
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
    }
  }
];

export const getMenuIconName = {
  iconName: "More"
};

export const menuIconSize = {
  menuIcon: {
    fontSize: 25
  }
};

export const topBarItemGap = { childrenGap: 20 };

export const TopBarIconsUIClassNames = mergeStyleSets({
  logo: {
    padding: 5
  },
  aquerium: {
    transform: "translateX(-21%)",
    fontSize: 20,
    color: "#1b3e74"
  },
  menu: {
    top: 5,
    right: 10,
    backgroundColor: "rgba(240, 240, 240, 0.7)"
  }
});