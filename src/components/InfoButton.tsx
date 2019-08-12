import React from "react";
import { ITextFieldProps, getId, Callout, IconButton } from "office-ui-fabric-react";

export interface IInfoButtonState {
  isCalloutVisible: boolean;
}

export interface IInfoButtonProps extends ITextFieldProps {
  calloutText: string;
}

class InfoButton extends React.Component<IInfoButtonProps, IInfoButtonState> {
  public state: IInfoButtonState = { isCalloutVisible: false };
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
        <IconButton
          id={this._iconButtonId}
          iconProps={{ iconName: "Info" }}
          ariaLabel="Info"
          onClick={this._onIconClick}
          styles={{
            root: {
              bottom: -15,
              left: 10,
              selectors: {
                "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
              },
              borderRadius: 3,
              transitionDelay: "0.05s"
            }
          }}
        />
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

export const description = (description: string) => {
  return (props?: ITextFieldProps): JSX.Element => {
    return <InfoButton {...props} calloutText={description} />;
  };
};
