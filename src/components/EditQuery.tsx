import React from "react";
import { classNames } from "./GridStyles";
import {
  Stack,
  TextField,
  ComboBox,
  ActionButton,
  Slider,
  DatePicker,
  DayOfWeek,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { _description, DayPickerStrings } from "./EditQueryInfo";

export interface CheckQueryCalloutState {
  selections: {};
  isCalloutVisible: boolean;
  messageType: MessageBarType;
  message: string;
}

export class EditQueryUI extends React.Component<{}> {
  selections = {};
  public state: CheckQueryCalloutState = {
    selections: {},
    isCalloutVisible: false,
    messageType: MessageBarType.success,
    message: ""
  };

  //Must be updated with a function that checks every field and makes appropriate
  //error messages.
  private _validate = (): void => {
    if (true) {
      this.setState({ isCalloutVisible: true });
      this.setState({ messageType: MessageBarType.severeWarning });
      this.setState({
        message: "Review query settings. Please ensure to have valid fields."
      });
    }
  };

  private _onDismiss = (): void => {
    if (true) this.setState({ isCalloutVisible: false });
  };

  public render(): JSX.Element {
    return (
      <div className={classNames.root}>
        <Stack
          horizontalAlign="start"
          verticalAlign="space-evenly"
          styles={{
            root: {
              padding: "2px 0px 2px 5px",
              color: "#1b3e74"
            }
          }}
          tokens={{ childrenGap: 5 }}
        >
          {this.state.isCalloutVisible && (
            <MessageBar
              messageBarType={this.state.messageType}
              styles={{ root: { width: 265 } }}
              onDismiss={this._onDismiss}
            >
              {this.state.message}
            </MessageBar>
          )}
          <Stack horizontal horizontalAlign="start">
            <ActionButton
              iconProps={{ iconName: "Back" }}
              styles={{
                icon: { fontSize: 20, color: "black" },
                root: { fontSize: 15 }
              }}
              text="Cancel"
            />
            <ActionButton
              iconProps={{ iconName: "CheckMark" }}
              styles={{
                icon: { fontSize: 25, color: "green" },
                root: { color: "green", fontSize: 15 }
              }}
              text="Save"
              onClick={this._validate}
            />

            <ActionButton
              iconProps={{ iconName: "Trash" }}
              styles={{
                icon: { fontSize: 17, color: "red" },
                root: { color: "red", fontSize: 15 }
              }}
              text="Remove"
            />
          </Stack>
          <TextField
            label="Your query title"
            required
            styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
          />
          <Stack horizontal horizontalAlign="center">
            <ComboBox
              required
              styles={{ root: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" } }}
              multiSelect
              label="Type of tasks"
              allowFreeform
              autoComplete="on"
              defaultSelectedKey={["issues", "pull requests"]}
              options={[
                { key: "issues", text: "Issues" },
                { key: "pull requests", text: "Pull Requests" }
              ]}
            />
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <ComboBox
              required
              multiSelect
              styles={{ root: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" } }}
              label="State of tasks"
              allowFreeform
              autoComplete="on"
              defaultSelectedKey={["open", "closed"]}
              options={[{ key: "open", text: "Open" }, { key: "closed", text: "Closed" }]}
            />
            {_description(
              "Choose whether you want to track Issues or Pull Requests that are open, closed or both."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Repo"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {_description(
              "List repositories from which wish to track Issues and/or Pull Requests.  Please enter titles as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Assignee"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {_description(
              "Track Issues and/or Pull Requests assigned to specific users.  Please enter names as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Author"
              styles={{
                fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }]
              }}
            />
            {_description(
              "Track Issues and/or Pull Requests opened by specific users.  Please enter names as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Mention"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {_description(
              "Track Issues and/or Pull Requests that mention specific users.  Please enter names as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <ComboBox
              styles={{
                root: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }
              }}
              multiSelect
              label="Review Status"
              allowFreeform
              autoComplete="on"
              options={[
                { key: "required", text: "Required" },
                { key: "approved", text: "Approved" },
                { key: "changesRequested", text: "Changes Requested" },
                { key: "reviewedByYou", text: "Reviewed By You" },
                { key: "awaitingYourReview", text: "Awaiting Your Review" }
              ]}
            />
            {_description("The number of days after which an Issue will be considered stale. ")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <DatePicker
              textField={{
                styles: { fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }
              }}
              label="Last reviewed"
              firstDayOfWeek={DayOfWeek.Sunday}
              strings={DayPickerStrings}
              placeholder="Select a date"
            />
            {_description(
              "Track Issues and/or Pull Requests that have not been reviewed since a given day."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
              label="Labels"
            />
            {_description(
              "The GitHub labels assigned to particular tasks. Please enter labels as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Issues"
              styles={{ container: { width: 200 } }}
              min={1}
              defaultValue={4}
              max={7}
              onChange={(value: number) => console.log({ value })}
            />
            {_description("The number of days after which an Issue will be considered stale.")()}
          </Stack>

          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Pull Requests"
              styles={{ container: { width: 200 } }}
              min={1}
              defaultValue={4}
              max={7}
              onChange={(value: number) => console.log({ value })}
            />
            {_description(
              "The number of days after which a Pull Request will be considered stale."
            )()}
          </Stack>
        </Stack>
      </div>
    );
  }
}

export default EditQueryUI;
