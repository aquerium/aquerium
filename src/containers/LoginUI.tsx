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
import { login, setIsInvalidPAT, IState } from "../state";
import { LoginUIClassNames } from "./LoginUI.styles";
import { connect } from "react-redux";

// Value corresponding to enter key.
const ENTER_KEYCODE = 13;

const imageProps: IImageProps = {
  src: "logo.png",
  imageFit: ImageFit.centerContain,
  maximizeFrame: true,
  width: 175,
  height: 175
};

interface ILoginProps {
  /** A function that calls the login action. */
  login: (PAT: string) => void;
  /** A function that sets the validity of the PAT for the UI to respond to. */
  setIsInvalidPAT: (isInvalid: boolean) => void;
  /** A boolean that stores whether the PAT is invalid. Defaults to false, but set to true if the PAT doesn't successfully return a valid query map object. */
  invalidPAT: boolean;
}

const mapStateToProps = (state: IState) => {
  return {
    invalidPAT: state.user.invalidPAT
  };
};

const getTextFieldStyles = (renderError: boolean) => {
  return (props: ITextFieldStyleProps) => {
    const { required } = props;
    return {
      fieldGroup: [
        { width: 350 },
        required && {
          borderColor: !renderError
            ? props.theme.semanticColors.inputBorder
            : props.theme.semanticColors.errorText
        }
      ]
    };
  };
};

const stackTokens = {
  childrenGap: "20%"
};

const onKeyDown = (checkPasswordValidity: () => void) => {
  return (event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;
    if (event.which === ENTER_KEYCODE) {
      checkPasswordValidity();
    }
  };
};

function LoginUIComponent(props: ILoginProps) {
  let currPAT: string = "";

  const updateCurrPAT = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    currPAT = newValue || "";
    if (currPAT === "") setIsInvalidPAT(false);
  };

  function onLogin() {
    props.login(currPAT);
  }

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="space-evenly"
      tokens={stackTokens}
      className={LoginUIClassNames.root}
    >
      <Image {...(imageProps as any)} className={LoginUIClassNames.logo} />
      <Text className={LoginUIClassNames.aqueriumTitle}>Welcome to Aquerium!</Text>
      <Text className={LoginUIClassNames.aqueriumInfo}>
        Keep track of desired queries at a glance and​ be notified when deadlines approach and pass.{" "}
      </Text>
      <Stack horizontal className={LoginUIClassNames.loginFields}>
        <TextField
          placeholder="Enter your GitHub PAT"
          required
          type="password"
          styles={getTextFieldStyles(props.invalidPAT)}
          onChange={updateCurrPAT}
          onKeyDown={onKeyDown(onLogin)}
          errorMessage={props.invalidPAT ? "This PAT is invalid or expired." : ""}
        />
        <PrimaryButton text="Submit" allowDisabledFocus={true} onClick={onLogin} />
      </Stack>
      <Link
        className={LoginUIClassNames.patLink}
        href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line"
        target="_blank"
      >
        Need a Personal Access Token (PAT)? Get one here.
      </Link>
    </Stack>
  );
}

const actions = {
  login,
  setIsInvalidPAT
};

export const LoginUI = connect(
  mapStateToProps,
  actions
)(LoginUIComponent);
