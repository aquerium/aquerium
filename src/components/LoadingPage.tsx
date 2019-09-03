import React from "react";
import { Stack, Spinner, SpinnerSize } from "office-ui-fabric-react";

interface ILoadingPageProps {
  /** The loading message to be rendered. */
  loadingMessage: string;
}

const stackStyles = { root: { height: "100%" } };

export const LoadingPage = (props: ILoadingPageProps): JSX.Element => {
  const { loadingMessage } = props;

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyles}>
      <Spinner label={loadingMessage} size={SpinnerSize.large}></Spinner>
    </Stack>
  );
};
