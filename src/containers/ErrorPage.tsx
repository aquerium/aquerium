import React from "react";
import { Stack, Text, Icon, ActionButton } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { IState, toHome, clearTokenLogout, toEditQuery, IQuery } from "../state";

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

// This error message renders if a user makes a query with over 100 tasks in it.
const TOO_MANY_TASKS_MESSAGE = "Uh oh, it looks like this query is returning a lot of tasks. For the sake of performance, would you mind narrowing your search?"

// Error codes handling failed authorization.
const FAILED_CREDENTIALS = [404, 401, 403];

// Error codes handling API failure.
const API_ERROR = 503;

// Error code handling a malformed query.
const BAD_QUERY = [422, 500];

// Custom Error Code handling a query with too many tasks entered.
const TOO_MANY_TASKS = -1;

interface IErrorPageProps {
  /** The error code potentially stored in state. If there is no code stored, a generic error message will render. */
  errorCode?: number;
  /** This function calls an action that takes the user to the Home UI. */
  toHome: () => void;
  /** This function calls an action to send the user to the Login UI, also clearing their PAT. */
  clearTokenLogout: () => void;
  /** This function calls an action to send the user to the Edit Query UI. */
  toEditQuery: (query?: IQuery) => void;
  /** The optional IQuery attatched to an error. */
  currQuery?: IQuery;
}

const mapStateToProps = (state: IState) => ({
  errorCode: state.changeUI.errorCode,
  currQuery: state.changeUI.currQuery
});

const errorIconStyles = { styles: { root: { fontSize: 50, color: "#8f191b" } } };
const oopsStyles = { root: { color: "#00395c", fontSize: 48 } };
const errorStyles = {
  root: { color: "#00395c", fontSize: 25, textAlign: "center", padding: "10px" }
};
const stackStyles = { root: { height: "100%" } };
const iconHomeProps = { iconName: "Home" };
const iconLogoutProps = { iconName: "SignOut" };
const iconEditProps = { iconName: "Edit" }
const returnIconStyles = {
  root: { fontSize: 30, transform: "translateY(200%)" },
  icon: { fontSize: 40 }
};

function ErrorPageView(props: IErrorPageProps) {

  // Brings the user to the editQuery UI.
  function onClickToEditQuery() {
    props.toEditQuery(props.currQuery);
  }

  // Returns the correct error icon, action, and action text based on error code.
  function returnErrorButton(errorCode?: number) {
    if (BAD_QUERY.includes(errorCode!!) || errorCode === TOO_MANY_TASKS) {
      return (
        <ActionButton
          iconProps={iconEditProps}
          text={"Return to your Query"}
          styles={returnIconStyles}
          onClick={onClickToEditQuery} />
      );
    } else if (errorCode === API_ERROR) {
      return (
        <ActionButton
          iconProps={iconHomeProps}
          text={"Return to Home"}
          styles={returnIconStyles}
          onClick={props.toHome} />
      );
    } else {
      return (
        <ActionButton
          iconProps={iconLogoutProps}
          text={"Return to Login"}
          styles={returnIconStyles}
          onClick={props.clearTokenLogout} />
      );
    }
  }


  // Uses ternary logic to determine what the error message should be.
  // If error code is undefined or does not exist in the error code arrays, the generic message is returned.
  // Else, either of the other error messages is selected.
  const errorMessage = !props.errorCode
    ? GENERIC_ERROR_MESSAGE
    : FAILED_CREDENTIALS.includes(props.errorCode)
      ? FAILED_CREDENTIALS_ERROR
      : (props.errorCode === API_ERROR)
        ? API_ERROR_MESSAGE
        : (BAD_QUERY.includes(props.errorCode))
          ? BAD_QUERY_MESSAGE
          : (props.errorCode === TOO_MANY_TASKS) ? TOO_MANY_TASKS_MESSAGE : GENERIC_ERROR_MESSAGE;
  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Icon iconName="Error" styles={errorIconStyles.styles} />
      <Text styles={oopsStyles}>Oops!</Text>
      <Text styles={errorStyles}>{errorMessage}</Text>
      {returnErrorButton(props.errorCode)}
    </Stack>
  );
}

const action = {
  toHome,
  clearTokenLogout,
  toEditQuery
};

export const ErrorPage = connect(
  mapStateToProps,
  action
)(ErrorPageView);
