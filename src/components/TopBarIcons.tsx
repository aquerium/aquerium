import * as React from 'react';
import { Image, IImageProps, ImageFit, Stack, Link, CommandBarButton } from 'office-ui-fabric-react';

class TopBarIcons extends React.Component<{}> {
  render() {
    const imageProps: IImageProps = {
      src: "GlitterboxLogo2.png",
      imageFit: ImageFit.centerContain,
      maximizeFrame: true,
      width: 90,
      height: 90
    };

    return (
      <Stack horizontal horizontalAlign="space-evenly" verticalAlign="center" styles={{root:{background: '#faf9f8', width: 430}}}>
        <div></div>
        <Link href="https://github.com" target='_blank' >
          <Image {...imageProps as any} title="My GitHub Home"/>
        </Link>
        <CommandBarButton menuIconProps={{iconName: "More" }} title="Options" 
          styles={{root:{width:48, height: 48, background: '#faf9f8'}, menuIcon:{fontSize:48, color: '#1B3E74'}}} 
          persistMenu={false}
          menuProps={{ items: this.getMenuItems(), shouldFocusOnMount: true,
                      shouldFocusOnContainer: true}}
        />
      </Stack>
    );
  }

  private getMenuItems = () => {
    return [
      {
        key: 'sign out',
        name: 'Sign Out',
        iconProps: {
          iconName: 'SignOut'
        }
      },
      {
        key: 'edit queries',
        name: 'Edit Queries',
        iconProps: {
          iconName: 'Edit'
        }
      }
    ]
  }
}

export default TopBarIcons;