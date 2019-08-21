import React from "react";
import {
  ITextFieldProps,
  getId,
  Callout,
  IconButton,
  mergeStyleSets
} from "office-ui-fabric-react";

interface IInfoButtonState {
  isCalloutVisible: boolean;
}

interface IInfoButtonProps extends ITextFieldProps {
  calloutText: string[];
}

const InfoButtonStyles = mergeStyleSets({
  icon: {
    selectors: {
      "&:hover": { background: "transparent" }
    },
    background: "transparent",
    borderRadius: 25
  },
  callout: {
    padding: 5,
    maxWidth: 150
  },
  calloutText: {
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

const infoIcon = {
  iconName: "Info"
};

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
          iconProps={infoIcon}
          ariaLabel="Info"
          onClick={this._onIconClick}
          className={InfoButtonStyles.icon}
        />
        {this.state.isCalloutVisible && (
          <Callout
            className={InfoButtonStyles.callout}
            target={"#" + this._iconButtonId}
            setInitialFocus={true}
            onDismiss={this._onDismiss}
            title={this.props.label}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
          >
            <div id={this._descriptionId}>
              {this.props.calloutText.map(text => (
                <span>
                  {text}
                  <br />
                </span>
              ))}
            </div>
          </Callout>
        )}
      </>
    );
  }
}

export const description = (description: string[]) => {
  return (props?: ITextFieldProps): JSX.Element => {
    return <InfoButton {...props} calloutText={description} />;
  };
};
