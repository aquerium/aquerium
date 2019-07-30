import React from 'react'
import { Stack, Image, IImageProps, ImageFit, Text, TextField, Link, IconButton} from 'office-ui-fabric-react'

  
class LoginUI extends React.Component {
    render() : JSX.Element {
        const imageProps: IImageProps = {
            src: "public\GlitterboxLogo2.png",
            imageFit: ImageFit.centerContain,
            maximizeFrame: true,
            width: 150,
            height: 150,
            onLoad: ev => console.log('image loaded', ev)
          };
        return(
            <Stack horizontalAlign="center" verticalAlign="center" styles={{root:{width:383, height: 500}}}>
                <Image {...imageProps as any} src="GlitterboxLogo2.png"/>
                <Text styles={{root:{fontFamily:"Segoe UI", fontSize:30, color:"#1B3E74"}}}>Aquerium</Text>
                <Text styles={{root:{textAlign: 'center', padding:20, fontFamily:"Segoe UI", fontSize:17, color:"#1B3E74"}}}>
                    Keep track of desired queries at a glance and​ be notified when deadlines approach and pass.
                </Text>
                <Stack horizontal>
                    <TextField 
                        placeholder="Please provide a PAT" 
                        styles={{root:{width:300, fontFamily:"Segoe UI", fontSize:15, color:"#1B3E74"}}}
                    />
                    <IconButton 
                        iconProps={{iconName: "IncreaseIndentArrow"}} 
                        styles={{icon:{color:"green"}}}
                        ariaLabel="Access"
                    />
                </Stack>
                
                <Link styles={{root:{padding: 5}}} href="https://google.com" target='_blank'> Don't have a Personal Access Token (PAT)? Get one here.</Link> 
            </Stack>
        );
    }
}

export default LoginUI;