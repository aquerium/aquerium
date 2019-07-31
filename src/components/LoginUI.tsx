import React from "react";
import {
  Stack,
  Image,
  IImageProps,
  ImageFit,
  Text,
  TextField,
  Link,
  PrimaryButton
} from "office-ui-fabric-react";

export const LoginUI = () => {
  const imageProps: IImageProps = {
    src: "GlitterboxLogo2.png",
    imageFit: ImageFit.centerContain,
    maximizeFrame: true,
    width: 100,
    height: 100,
    onLoad: ev => console.log("image loaded", ev)
  };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="space-evenly"
      tokens={{ childrenGap: "5%", padding: "20 px" }}
    >
      <Image {...imageProps as any} />
      <Text
        styles={{
          root: {
            textAlign: "center",
            padding: 20,
            fontFamily: "Segoe UI",
            fontSize: 12,
            color: "#1b3e74"
          }
        }}
      >
        Welcome to Aquerium! <br />
        Keep track of desired queries at a glance and​ be notified when
        deadlines approach and pass.
      </Text>
      <Stack horizontal>
        <TextField
          placeholder="Please provide a PAT"
          styles={{
            root: {
              width: 175,
              fontFamily: "Segoe UI",
              fontSize: 10,
              color: "#1b3e74"
            }
          }}
        />
        <PrimaryButton
          text="Login"
          allowDisabledFocus={true}
          styles={{ root: { color: "#ffffff", width: "10px" } }}
        />
      </Stack>
      <Link
        styles={{ root: { padding: 5 } }}
        href="https://google.com"
        target="_blank"
        style={{
          fontFamily: "Segoe UI",
          fontSize: "11px"
        }}
      >
        Don't have a Personal Access Token (PAT)? Get one here.
      </Link>
    </Stack>
  );
};

export default LoginUI;
