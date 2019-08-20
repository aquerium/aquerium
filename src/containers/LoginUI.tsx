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
import { LoginUIClassNames } from "../components/LoginUI.ClassNames";
import { login, setValidPAT } from "../state";
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

/**
 * @property { function } login a function that calls the login action
 */
interface ILoginProps {
  login: (PAT: string) => void;
  setValidPAT: (isValid: boolean) => void;
  isValidPAT: boolean;
}

const mapStateToProps = (state: IState) => {
  return {
    isValidPAT: state.validPAT //isValidPAT is our new hook
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
  padding: "20 px"
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

  // const checkPasswordValidity = () => {
  //   if (currPAT !== "correct") setValidPAT(true);
  //   else {
  //     setValidPAT(false);
  //     const dummyData = {
  //       //TODO This object is an IUser that will be replaced with actual data in Cathy's next PR
  //       token: "fake token",
  //       username: "fake username",
  //       gistID: "fake gist"
  //     };
  //     onLogin(dummyData);
  //   }
  // };

  const updateCurrPAT = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    currPAT = newValue || "";
    if (currPAT === "") setValidPAT(false);
  };

  function onLogin() {
    console.log("here");
    console.log(props.isValidPAT); //does this not call?
    props.login(currPAT);
    console.log(props.isValidPAT);
  }

  return (
    <Stack horizontalAlign="center" verticalAlign="space-evenly" tokens={stackTokens}>
      <Image {...imageProps as any} />
      <Text className={LoginUIClassNames.aqueriumTitle}>Welcome to Aquerium!</Text>
      <Text className={LoginUIClassNames.aqueriumInfo}>
        Keep track of desired queries at a glance and​ be notified when deadlines approach and pass.{" "}
      </Text>
      <Stack horizontal>
        <TextField
          placeholder="Enter your GitHub PAT"
          required
          styles={getTextFieldStyles(props.isValidPAT)}
          onChange={updateCurrPAT}
          onKeyDown={onKeyDown(onLogin)}
          errorMessage={props.isValidPAT ? "InvalidPAT" : ""}
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

const action = {
  login,
  setValidPAT
};

export const LoginUI = connect(
  mapStateToProps,
  action
)(LoginUIComponent);
