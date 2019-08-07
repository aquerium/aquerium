import React from "react";
import { TaskTileClassNames } from "./TaskTile.ClassNames";
import {
  Stack,
  TextField,
  ComboBox,
  ActionButton,
  Slider,
  MessageBar,
  MessageBarType,
  MessageBarButton
} from "office-ui-fabric-react";
import { description } from "./InfoButton";

enum inputStatuses {
  successfulSave = 0,
  invalidSave,
  toRemove,
  cancel
}

export interface IEditQueryUIState {
  inputStatus: inputStatuses;
  messageType: MessageBarType;
  message: string;
  render: boolean;
}

export class EditQueryUI extends React.Component<{}, IEditQueryUIState> {
  public state: IEditQueryUIState = {
    inputStatus: inputStatuses.cancel,
    messageType: MessageBarType.success,
    message: "",
    render: false
  };

  //Must be updated with a function that checks every field and makes appropriate
  //error messages.
  private setMessageBar = (saveStatus: inputStatuses): void => {
    let currMessage = "";
    let currMessageType = MessageBarType.success;
    let toRender = true;
    switch (saveStatus) {
      case inputStatuses.successfulSave:
        currMessage = "Successfully saved query edits!";
        currMessageType = MessageBarType.success;
        break;
      case inputStatuses.invalidSave:
        currMessage = "Review query settings. Please ensure to have valid fields";
        currMessageType = MessageBarType.severeWarning;
        break;
      case inputStatuses.toRemove:
        currMessage = "Are you sure you wish to delete this query?";
        currMessageType = MessageBarType.error;
        break;
      case inputStatuses.cancel:
        currMessage = "Are you sure you wish to discard changes?";
        currMessageType = MessageBarType.warning;
        break;
    }
    this.setState({
      inputStatus: saveStatus,
      messageType: currMessageType,
      message: currMessage,
      render: toRender
    });
  };

  private onDismiss = (): void => {
    this.setState({ render: false });
  };

  private messageBar() {
    return (
      <MessageBar
        messageBarType={this.state.messageType}
        styles={{
          root: {
            width: 250,
            borderRadius: "4px",
            padding: 3,
            boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)"
          }
        }}
        onDismiss={this.onDismiss}
        actions={
          this.state.inputStatus === inputStatuses.toRemove ||
          this.state.inputStatus === inputStatuses.cancel ? (
            <div>
              <MessageBarButton>Yes</MessageBarButton>
              <MessageBarButton>No</MessageBarButton>
            </div>
          ) : (
            <div />
          )
        }
      >
        {this.state.message}
      </MessageBar>
    );
  }

  public render(): JSX.Element {
    return (
      <div className={TaskTileClassNames.root}>
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
          {this.state.render && this.messageBar()}
          <Stack horizontal horizontalAlign="start">
            <ActionButton
              iconProps={{ iconName: "Back" }}
              styles={{
                icon: { fontSize: 20, color: "black" },
                root: { fontSize: 15 }
              }}
              text="Cancel"
              onClick={() => {
                this.setMessageBar(inputStatuses.cancel);
              }}
            />
            <ActionButton
              iconProps={{ iconName: "CheckMark" }}
              styles={{
                icon: { fontSize: 25, color: "green" },
                root: { color: "green", fontSize: 15 }
              }}
              text="Save"
              onClick={() => {
                // Here is the ideal framework with a query settings validation function
                /* if (validSave) */ this.setMessageBar(inputStatuses.successfulSave);
                /* else this._setMessageBar(inputStatuses.invalidSave);*/
              }}
            />

            <ActionButton
              iconProps={{ iconName: "Trash" }}
              styles={{
                icon: { fontSize: 17, color: "red" },
                root: { color: "red", fontSize: 15 }
              }}
              text="Remove"
              onClick={() => {
                this.setMessageBar(inputStatuses.toRemove);
              }}
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
            {description(
              "Choose whether you want to track Issues or Pull Requests that are open, closed or both."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Repo"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description("List a repository from which to track Issues and/or Pull Requests.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Assignee"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description("Track Issues and/or Pull Requests assigned to a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Author"
              styles={{
                fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }]
              }}
            />
            {description("Track Issues and/or Pull Requests opened by a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Mention"
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description(
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
            {description("The number of days after which an Issue will be considered stale. ")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
              label="Labels"
            />
            {description(
              "The GitHub labels assigned to particular tasks. Please enter labels as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Last Updated"
              styles={{ container: { width: 200 } }}
              min={1}
              defaultValue={7}
              max={31}
            />
            {description(
              "Track Issues and/or Pull Requests that have not been updated a specififc number of days."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Issues"
              styles={{ container: { width: 200 } }}
              min={1}
              defaultValue={4}
              max={7}
            />
            {description("The number of days after which an Issue will be considered stale.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Pull Requests"
              styles={{ container: { width: 200 } }}
              min={1}
              defaultValue={4}
              max={7}
            />
            {description(
              "The number of days after which a Pull Request will be considered stale."
            )()}
          </Stack>
        </Stack>
      </div>
    );
  }
}

export default EditQueryUI;
