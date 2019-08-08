import React from "react";
import {
  Stack,
  Image,
  IImageProps,
  ImageFit,
  Text,
  TextField,
  Link,
  PrimaryButton,
  ITextFieldStyleProps
} from "office-ui-fabric-react";
import { IState, login } from "../state";
import { connect } from "react-redux";

const imageProps: IImageProps = {
  src: "GlitterboxLogo2.png",
  imageFit: ImageFit.centerContain,
  maximizeFrame: true,
  width: 100,
  height: 100,
  onLoad: ev => console.log("image loaded", ev)
};

interface ILoginProps {
  login: () => void;
}

const mapStateToProps = (state: IState) => ({
  //sync these to the store
  UI: state.changeUI.currUI
});

function Login_UI(props: ILoginProps) {
  let currPAT: any = "";
  const [isValidPAT, setIsValidPAT] = React.useState(true);

  function onLogin(): void {
    props.login();
  }

  const checkPasswordValidity = () => {
    if (currPAT !== "correct") setIsValidPAT(false);
    else {
      setIsValidPAT(true);
      onLogin();
    }
  };

  const updateCurrPAT = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    currPAT = newValue;
  };

  const ensureEnter = (event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;
    if (event.which === 13) {
      checkPasswordValidity();
    }
  };

  const getTextFieldStyles = (props: ITextFieldStyleProps) => {
    const { required } = props;
    return {
      root: {
        width: 175,
        fontSize: 10,
        color: "#1b3e74"
      },
      fieldGroup: [
        { width: 175 },
        required && {
          borderColor: isValidPAT
            ? props.theme.semanticColors.actionLink
            : props.theme.semanticColors.errorText
        }
      ]
    };
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
            fontSize: 12,
            color: "#1b3e74"
          }
        }}
      >
        Welcome to Aquerium! <br />
        Keep track of desired queries at a glance and​ be notified when deadlines approach and pass.
      </Text>
      <Stack horizontal>
        <TextField
          placeholder="Enter your GitHub PAT"
          required
          styles={getTextFieldStyles}
          onChange={updateCurrPAT}
          onKeyDown={ensureEnter}
          errorMessage={isValidPAT ? "" : "InvalidPAT"}
        />
        <PrimaryButton
          text="Submit"
          allowDisabledFocus={true}
          styles={{ root: { color: "#ffffff", width: "10px" } }}
          onClick={checkPasswordValidity}
        />
      </Stack>
      <Link
        styles={{ root: { marginBottom: 5, position: "static" } }}
        href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line"
        target="_blank"
        style={{
          fontSize: "11px"
        }}
      >
        Don't have a Personal Access Token (PAT)? Get one here.
      </Link>
    </Stack>
  );
}

const action = {
  login
};

export const LoginUI = connect(
  mapStateToProps,
  action
)(Login_UI);
