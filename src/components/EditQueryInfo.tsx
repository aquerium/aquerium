import {
  ITextFieldProps,
  getId,
  Stack,
  IconButton,
  Callout,
  IDatePickerStrings,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import React from "react";

export interface CalloutState {
  isCalloutVisible: boolean;
}

export interface InfoButtonProps extends ITextFieldProps {
  calloutText: string;
}

class InfoButtonClass extends React.Component<InfoButtonProps, CalloutState> {
  public state: CalloutState = { isCalloutVisible: false };
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
        <Stack horizontal verticalAlign="center">
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

export const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker",

  isRequiredErrorMessage: "Field is required.",

  invalidInputErrorMessage: "Invalid date format."
};
