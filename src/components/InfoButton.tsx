import React from "react";
import {
  ITextFieldProps,
  getId,
  Callout,
  IconButton,
  mergeStyleSets
} from "office-ui-fabric-react";

interface IInfoButtonState {
  /** A boolean that controls whether or not the callout info button is visible. */
  isCalloutVisible: boolean;
}

interface IInfoButtonProps extends ITextFieldProps {
  /** String with text to be displayed. */
  calloutText: string;
  /** Whether the info button must be translated up a number of pixels. */
  translate?: boolean;
}

const InfoButtonStyles = mergeStyleSets({
  icon: {
    selectors: {
      "&:hover": { background: "transparent" },
      "&:active": { background: "transparent" }
    },
    background: "transparent",
    borderRadius: 25
  },
  callout: {
    padding: 10
  },
  textDiv: {
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    maxWidth: "400px",
    overflowY: "auto",
    maxHeight: "400px"
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
          styles={this.props.translate ? { root: { transform: "translateY(-28px)" } } : {}}
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
            <div id={this._descriptionId} className={InfoButtonStyles.textDiv}>
              {this.props.calloutText}
            </div>
          </Callout>
        )}
      </>
    );
  }
}

export const description = (description: string, translate?: boolean) => {
  return (props?: ITextFieldProps): JSX.Element => {
    return <InfoButton {...props} calloutText={description} translate={translate || false} />;
  };
};
