import React from "react";
import { Stack, Text, Icon, ActionButton } from "office-ui-fabric-react";

interface IErrorPageProps {
  /** The error message to be rendered. */
  errorMessage: string;
}

const errorIconStyles = { styles: { root: { fontSize: 50, color: "#8f191b" } } };
const oopsStyles = { root: { color: "#00395c", fontSize: 48 } };
const errorStyles = { root: { color: "#00395c", fontSize: 30 } };
const stackStyles = { root: { height: "100%" } };
const iconProps = { iconName: "Home" };
const homeIconStyles = {
  root: { fontSize: 30, transform: "translateY(200%)" },
  icon: { fontSize: 80 }
};

export const ErrorPage = (props: IErrorPageProps): JSX.Element => {
  const { errorMessage } = props;

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Icon iconName="Error" styles={errorIconStyles.styles} />
      <Text styles={oopsStyles}>Oops!</Text>
      <Text styles={errorStyles}>{errorMessage}</Text>
      <ActionButton iconProps={iconProps} text="Return to Home" styles={homeIconStyles} />
    </Stack>
  );
};
