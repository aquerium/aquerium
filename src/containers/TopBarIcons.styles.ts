import { mergeStyleSets } from "@uifabric/styling";
import { IImageProps, ImageFit } from "office-ui-fabric-react";

export const imageProps: IImageProps = {
  src: "GlitterboxLogo2.png",
  imageFit: ImageFit.centerContain,
  maximizeFrame: true,
  width: 40,
  height: 40
};

export const getMenuIconName = {
  iconName: "More"
};

export const menuIconSize = {
  menuIcon: {
    fontSize: 25
  }
};

export const refreshIcon = {
  iconName: "Refresh"
};

export const refreshIconStyles = { icon: { fontSize: 22 } };

export const topBarItemGap = { childrenGap: 20 };

export const TopBarIconsUIClassNames = mergeStyleSets({
  topBar: { height: "43px", transform: "translateY(10%)" },
  logo: {
    transform: "translateX(60%)",
    padding: 5
  },
  aquerium: {
    transform: "translateX(-62%)",
    fontSize: 20,
    color: "#1b3e74"
  },
  menu: {
    right: 10,
    backgroundColor: "rgba(240, 240, 240, 0.7)"
  }
});
