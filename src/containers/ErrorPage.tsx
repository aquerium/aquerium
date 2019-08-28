import React from "react";
import { Stack, Text, Icon, ActionButton } from "office-ui-fabric-react";
import { connect } from "react-redux";
import { IState, toHome } from "../state";

interface IErrorPageProps {
  /** The error message to be rendered. */
  errorMessage?: string;
  /** This function calls an action that takes the user to the Home UI. */
  toHome: () => void;
}

const mapStateToProps = (state: IState) => ({
  errorMessage: state.changeUI.errorMessage
});

const errorIconStyles = { styles: { root: { fontSize: 50, color: "#8f191b" } } };
const oopsStyles = { root: { color: "#00395c", fontSize: 48 } };
const errorStyles = {
  root: { color: "#00395c", fontSize: 25, textAlign: "center", padding: "10px" }
};
const stackStyles = { root: { height: "100%" } };
const iconProps = { iconName: "Home" };
const homeIconStyles = {
  root: { fontSize: 30, transform: "translateY(200%)" },
  icon: { fontSize: 80 }
};

function ErrorPageView(props: IErrorPageProps) {
  const { errorMessage } = props;

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Icon iconName="Error" styles={errorIconStyles.styles} />
      <Text styles={oopsStyles}>Oops!</Text>
      <Text styles={errorStyles}>{errorMessage}</Text>
      <ActionButton
        iconProps={iconProps}
        text="Return to Home"
        styles={homeIconStyles}
        onClick={props.toHome}
      />
    </Stack>
  );
}

const action = {
  toHome
};

export const ErrorPage = connect(
  mapStateToProps,
  action
)(ErrorPageView);
