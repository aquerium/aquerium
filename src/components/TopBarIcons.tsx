import * as React from 'react';
import { Image, IImageProps, ImageFit, Stack, IconButton, Link } from 'office-ui-fabric-react';

class TopBarIcons extends React.Component<{}> {
  render() {
    const imageProps: IImageProps = {
      src: "public\GlitterboxLogo2.png",
      imageFit: ImageFit.centerContain,
      maximizeFrame: true,
      width: 90,
      height: 90,
      onLoad: ev => console.log('image loaded', ev)
    };

    return (
      <Stack horizontal horizontalAlign="space-evenly" verticalAlign="center" styles={{root:{background: '#faf9f8', width: 430}}}>
        <div></div>
        <Link href="https://github.com" target='_blank' >
          <Image {...imageProps as any} src="GlitterboxLogo2.png" title="My GitHub Home"/>
        </Link>
        <IconButton iconProps={{iconName: "More" }} title="Options" styles={{root:{width:48, height: 48}, icon:{fontSize:48}}}/>
      </Stack>
    );
  }
}

export default TopBarIcons;