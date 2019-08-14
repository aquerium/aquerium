import * as React from "react";
import { Image, Stack, Link, Text, CommandBarButton } from "office-ui-fabric-react";
import {
  TopBarIconsUIClassNames,
  getMenuIconName,
  menuProps,
  imageProps,
  menuIconSize,
  topBarItemGap
} from "./TopBarIconsStyles";

const TopBarIcons = () => {
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
};

export default TopBarIcons;
