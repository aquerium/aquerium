import React from "react";
import { Stack, Text, Icon, ActionButton } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { IState, toHome, logout } from "../state";

// The error message sent if an error occured regarding user credentials.
const FAILED_CREDENTIALS_ERROR =
  "It looks like we had an problem processing your credentials. Please verify your PAT by signing in again.";

// The error message sent if an API call failed.
const API_ERROR_MESSAGE =
  "It looks like we encountered a problem with the API, please try again later.";

// This error message renders if an unexpected error code was received.
const GENERIC_ERROR_MESSAGE = "Sorry, we've encountered an unexpected error. Please sign in again.";

// This error message renders if the query was malformed.
const BAD_QUERY_MESSAGE =
  "Whoops, it looks like some of the fields of the query you entered were invalid. Perhaps try double-checking what you entered?";

// Error codes handling failed authorization.
const FAILED_CREDENTIALS = [404, 401, 403];

// Error codes handling API failure.
const API_ERROR = [500, 503];

// Error code handling a malformed query.
const BAD_QUERY = 422;

interface IErrorPageProps {
  /** The error code potentially stored in state. If there is no code stored, a generic error message will render. */
  errorCode?: number;
  /** This function calls an action that takes the user to the Home UI. */
  toHome: () => void;
  /** This function calls an action to send the user to the Login UI. */
  logout: () => void;
}

const mapStateToProps = (state: IState) => ({
  errorCode: state.changeUI.errorCode
});

const errorIconStyles = { styles: { root: { fontSize: 50, color: "#8f191b" } } };
const oopsStyles = { root: { color: "#00395c", fontSize: 48 } };
const errorStyles = {
  root: { color: "#00395c", fontSize: 25, textAlign: "center", padding: "10px" }
};
const stackStyles = { root: { height: "100%" } };
const iconHomeProps = { iconName: "Home" };
const iconLogoutProps = { iconName: "SignOut" };
const homeIconStyles = {
  root: { fontSize: 30, transform: "translateY(200%)" },
  icon: { fontSize: 80 }
};

function ErrorPageView(props: IErrorPageProps) {
  // Uses ternary logic to determine what the error message should be.
  // If error code is undefined or does not exist in the error code arrays, the generic message is returned.
  // Else, either of the other error messages is selected.
  const errorMessage = !props.errorCode
    ? GENERIC_ERROR_MESSAGE
    : FAILED_CREDENTIALS.includes(props.errorCode)
      ? FAILED_CREDENTIALS_ERROR
      : API_ERROR.includes(props.errorCode)
        ? API_ERROR_MESSAGE
        : (props.errorCode === BAD_QUERY)
          ? BAD_QUERY_MESSAGE
          : GENERIC_ERROR_MESSAGE;

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Icon iconName="Error" styles={errorIconStyles.styles} />
      <Text styles={oopsStyles}>Oops!</Text>
      <Text styles={errorStyles}>{errorMessage}</Text>
      <ActionButton
        iconProps={errorMessage === API_ERROR_MESSAGE || errorMessage === BAD_QUERY_MESSAGE ? iconHomeProps : iconLogoutProps}
        text={errorMessage === API_ERROR_MESSAGE || errorMessage === BAD_QUERY_MESSAGE ? "Return to Home" : "Return to Login"}
        styles={homeIconStyles}
        onClick={errorMessage === API_ERROR_MESSAGE ? props.toHome : props.logout}
      />
    </Stack>
  );
}

const action = {
  toHome,
  logout
};

export const ErrorPage = connect(
  mapStateToProps,
  action
)(ErrorPageView);
