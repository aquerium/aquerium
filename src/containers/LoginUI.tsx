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
import { LoginUIClassNames } from "./LoginUI.styles";
import { login } from "../state";
import { connect } from "react-redux";
import { IState, IUserInfo } from "../state/state.types";

/** @constant
    @type {number} value corresponding to enter key 
*/
const ENTER_KEYCODE = 13;

const imageProps: IImageProps = {
  src: "GlitterboxLogo2.png",
  imageFit: ImageFit.centerContain,
  maximizeFrame: true,
  width: 100,
  height: 100
};

interface ILoginProps {
  /** A function that calls the login action */
  login: (user: IUserInfo) => void;
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user
  };
};

const getTextFieldStyles = (renderError: boolean) => {
  return (props: ITextFieldStyleProps) => {
    const { required } = props;
    return {
      fieldGroup: [
        { width: 180 },
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
  childrenGap: "5%",
  padding: "20px"
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
  let currPAT: any = "";
  const [renderError, setRenderError] = React.useState(false);

  function onLogin(user: IUserInfo): void {
    props.login(user);
  }

  const checkPasswordValidity = () => {
    if (currPAT !== "correct") setRenderError(true);
    else {
      setRenderError(false);
      const dummyData = {
        //TODO This object is an IUser that will be replaced with actual data in Cathy's next PR
        token: "fake token",
        username: "fake username",
        gistID: "fake gist"
      };
      onLogin(dummyData);
    }
  };

  const updateCurrPAT = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    currPAT = newValue || "";
    if (currPAT === "") setRenderError(false);
  };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="space-evenly"
      tokens={stackTokens}
      className={LoginUIClassNames.root}
    >
      <Image {...imageProps as any} className={LoginUIClassNames.logo} />
      <Text className={LoginUIClassNames.aqueriumTitle}>Welcome to Aquerium!</Text>
      <Text className={LoginUIClassNames.aqueriumInfo}>
        Keep track of desired queries at a glance and​ be notified when deadlines approach and pass.{" "}
      </Text>
      <Stack horizontal className={LoginUIClassNames.loginFields}>
        <TextField
          placeholder="Enter your GitHub PAT"
          required
          styles={getTextFieldStyles(renderError)}
          onChange={updateCurrPAT}
          onKeyDown={onKeyDown(checkPasswordValidity)}
          errorMessage={renderError ? "InvalidPAT" : ""}
        />
        <PrimaryButton text="Submit" allowDisabledFocus={true} onClick={checkPasswordValidity} />
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

const action = {
  login
};

export const LoginUI = connect(
  mapStateToProps,
  action
)(LoginUIComponent);
