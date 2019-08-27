import React from "react";
import { Stack, Text, Icon, ActionButton } from "office-ui-fabric-react";

interface IErrorPageProps {
  /** The error message to be rendered. */
  errorString: string;
}

const iconStyles = { styles: { root: { fontSize: 50, color: "#8f191b" } } };
const oopsStyles = { root: { color: "#00395c", fontSize: 48 } };
const errorStyles = { root: { color: "#00395c", fontSize: 30 } };
const stackProps = { root: { height: "100%" } };

export const ErrorPage = (props: IErrorPageProps): JSX.Element => {
  const { errorString } = props;

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackProps}>
      <Icon iconName="Error" styles={iconStyles.styles} />
      <Text styles={oopsStyles}>Oops!</Text>
      <Text styles={errorStyles}>{errorString}</Text>
      <ActionButton
        iconProps={{ iconName: "Home" }}
        text="Return to Home"
        styles={{
          root: { fontSize: 30, transform: "translateY(200%)" },
          icon: { fontSize: 80 }
        }}
      />
    </Stack>
  );
};
