import { ITextFieldProps, getId, Stack, IconButton, Callout } from "office-ui-fabric-react";
import React from "react";

export interface InfoButtonState {
  isCalloutVisible: boolean;
}

export interface InfoButtonProps extends ITextFieldProps {
  calloutText: string;
}

class InfoButtonClass extends React.Component<InfoButtonProps, InfoButtonState> {
  public state: InfoButtonState = { isCalloutVisible: false };
  private _descriptionId: string = getId("description");
  private _iconButtonId: string = getId("iconButton");

  private _onIconClick = (): void => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
  };

  private _onDismiss = (): void => {
    this.setState({ isCalloutVisible: false });
  };

  public render(): JSX.Element | null {
    if (!this.props) return null;
    return (
      <>
        <Stack
          horizontal
          verticalAlign="center"
          //   styles={{ root: { fontFamily: "Segoe UI", fontSize: 15 } }}
        >
          {
            <IconButton
              id={this._iconButtonId}
              iconProps={{ iconName: "Info" }}
              ariaLabel="Info"
              onClick={() => {
                this._onIconClick();
              }}
            />
          }
        </Stack>
        {this.state.isCalloutVisible && (
          <Callout
            target={"#" + this._iconButtonId}
            setInitialFocus={true}
            onDismiss={this._onDismiss}
            title={this.props.label}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
            styles={{ root: { padding: 5 } }}
          >
            <span id={this._descriptionId}>{this.props.calloutText}</span>
          </Callout>
        )}
      </>
    );
  }
}

export const _description = (description: string) => {
  return (props?: ITextFieldProps): JSX.Element => {
    return <InfoButtonClass {...props} calloutText={description} />;
  };
};
