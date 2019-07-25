import * as React from 'react';
import { Image, IImageProps, ImageFit, Stack, IconButton, Link } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

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

    const itemStyles: React.CSSProperties = {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    };

    return (
      <Stack horizontal horizontalAlign="space-evenly" verticalAlign="center" styles={{root:{width:383}}}>
        <IconButton style={itemStyles} iconProps={{iconName: "Add" }} title="Add Query" styles={{root:{width:48, height: 48}, icon:{color:"greenYellow", fontSize:48}}}/>
        <Link href="https://github.com" target='_blank'>
          <Image {...imageProps as any} style={itemStyles} src="GlitterboxLogo2.png" title="My GitHub Home"/>
        </Link>
        <IconButton style={itemStyles} iconProps={{iconName: "SignOut" }} title="Sign Out" styles={{root:{width:48, height: 48}, icon:{color:"red", fontSize:48}}}/>
      </Stack>
    );
  }
}

export default TopBarIcons;