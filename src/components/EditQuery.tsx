import React, { FormEvent } from "react";
import update from "immutability-helper";
import { TaskTileClassNames } from "./TaskTile.ClassNames";
import {
  Stack,
  TextField,
  ActionButton,
  Slider,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react";
import { description } from "./InfoButton";
import { IQuery } from "./IQuery";

enum InputStatuses {
  /* Whether the settings are validated and successfully updated to the new (or existing) query */
  successfulSave = 0,
  /* Whether the current user input is valid or not */
  invalidSave,
  /* Whether the user wishes to delete a query */
  toRemove,
  /* Whether the user wished to cancel the creation of a new query and/or discard current changes */
  cancel
}

interface IEditQueryUIState {
  /* Tracks the state of changes the user is making to a query's settings. */
  inputStatus: InputStatuses;
  /** Tracks the the type of message that should be rendered, 
      given the action the user wants to take and the status of the query's settings.
  */
  messageType: MessageBarType;
  /* Tracks the message that should be rendered by the message bar, if needed. */
  message: string;
  /* Whether or not a message bar should be rendered, given the action the user wants to take */
  renderMessageBar: boolean;
  /* Whether the review status field is enabked or not, depending on if PR's are in the query */
  enableReviewStatusField: boolean;
  /** The current selections the user is making to a query, which will be used to either construct
      a new query or edit an existing one.
  */
  selections: IQuery;
}

interface IEditQueryUIProps {
  currQuery: IQuery;
}

export class EditQueryUI extends React.Component<IEditQueryUIProps, IEditQueryUIState> {
  public state: IEditQueryUIState = {
    inputStatus: InputStatuses.cancel,
    messageType: MessageBarType.success,
    message: "",
    renderMessageBar: false,
    enableReviewStatusField: true,
    selections: {
      name: "",
      lastUpdated: 7,
      stalenessIssue: 4,
      stalenessPull: 4,
      tasks: []
    }
  };

  //Must be updated with a function that checks every field and makes appropriate
  //error messages.
  private setMessageBarCancel = (): void => {
    this.setState({
      inputStatus: InputStatuses.cancel,
      messageType: MessageBarType.warning,
      message: "Are you sure you wish to discard changes?",
      renderMessageBar: true
    });
  };

  // Here is the ideal framework with a query settings validation function
  private setMessageBarSave = (): void => {
    this.setState({
      inputStatus: InputStatuses.successfulSave,
      messageType: MessageBarType.success,
      message: "Successfully saved query settings!",
      renderMessageBar: true
    });
  };

  private setMessageBarRemove = (): void => {
    this.setState({
      inputStatus: InputStatuses.toRemove,
      messageType: MessageBarType.error,
      message: "Are you sure you wish to delete this query?",
      renderMessageBar: true
    });
  };

  private onDismiss = (): void => {
    this.setState({ renderMessageBar: false });
  };

  private messageBar = (): JSX.Element => {
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
          this.state.inputStatus === InputStatuses.toRemove ||
          this.state.inputStatus === InputStatuses.cancel ? (
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
  };

  private setNameSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: string | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { name: input } });
    this.setState({ selections: updatedSelections });
  };

  private setTypeSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) return;
    const newKey = item.key === "issues and pr" ? undefined : item.key;
    if (newKey === "issues") this.setState({ enableReviewStatusField: false });
    else this.setState({ enableReviewStatusField: true });
    const updatedSelections = update(this.state.selections, {
      $merge: { type: newKey as IQuery["type"] }
    });
    this.setState({ selections: updatedSelections });
  };

  private setRepoSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: string | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { repo: input } });
    this.setState({ selections: updatedSelections });
  };

  private setAssigneeSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: string | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { assignee: input } });
    this.setState({ selections: updatedSelections });
  };

  private setAuthorSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: string | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { author: input } });
    this.setState({ selections: updatedSelections });
  };

  private setMentionSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: string | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { mentions: input } });
    this.setState({ selections: updatedSelections });
  };

  private setReviewStatusSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) return;
    const newKey = item.key === "N/A" ? undefined : item.key;
    const updatedSelections = update(this.state.selections, {
      $merge: { reviewStatus: newKey as IQuery["reviewStatus"] }
    });
    this.setState({ selections: updatedSelections });
  };

  private setstalenessIssueSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { stalenessIssue: input } });
    this.setState({ selections: updatedSelections });
  };

  private setLastUpdatedSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { lastUpdated: input } });
    this.setState({ selections: updatedSelections });
  };

  private setStalenessPullSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { stalenessPull: input } });
    this.setState({ selections: updatedSelections });
  };

  private setLabelsSelection = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    input?: any | undefined
  ): void => {
    const updatedSelections = update(this.state.selections, { $merge: { labels: input } });
    this.setState({ selections: updatedSelections });
  };

  public render = (): JSX.Element => {
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
          {this.state.renderMessageBar && this.messageBar()}
          <Stack horizontal horizontalAlign="start">
            <ActionButton
              iconProps={{ iconName: "Back" }}
              styles={{
                icon: { fontSize: 20, color: "black" },
                root: { fontSize: 15 }
              }}
              text="Cancel"
              onClick={this.setMessageBarCancel}
            />
            <ActionButton
              iconProps={{ iconName: "CheckMark" }}
              styles={{
                icon: { fontSize: 25, color: "green" },
                root: { color: "green", fontSize: 15 }
              }}
              text="Save"
              onClick={this.setMessageBarSave}
            />

            <ActionButton
              iconProps={{ iconName: "Trash" }}
              styles={{
                icon: { fontSize: 17, color: "red" },
                root: { color: "red", fontSize: 15 }
              }}
              text="Remove"
              onClick={this.setMessageBarRemove}
            />
          </Stack>
          <TextField
            label="Your query title"
            onChange={this.setNameSelection}
            required
            styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
          />
          <Stack horizontal horizontalAlign="center">
            <Dropdown
              required
              styles={{
                dropdown: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" },
                root: { width: 190 }
              }}
              onChange={this.setTypeSelection}
              label="Type of tasks"
              selectedKey={
                this.state.selections.type ? this.state.selections.type : "issues and pr"
              }
              options={[
                { key: "issues", text: "Only Issues" },
                { key: "pr", text: "Only Pull Requests" },
                { key: "issues and pr", text: "Issues and Pull Requests" }
              ]}
            />
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Repo"
              onChange={this.setRepoSelection}
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description("List a repository from which to track Issues and/or Pull Requests.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Assignee"
              onChange={this.setAssigneeSelection}
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description("Track Issues and/or Pull Requests assigned to a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Author"
              onChange={this.setAuthorSelection}
              styles={{
                fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }]
              }}
            />
            {description("Track Issues and/or Pull Requests opened by a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Mention"
              onChange={this.setMentionSelection}
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
            />
            {description(
              "Track Issues and/or Pull Requests that mention specific users.  Please enter names as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Dropdown
              styles={{
                dropdown: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" },
                root: { width: 185 }
              }}
              disabled={this.state.enableReviewStatusField ? false : true}
              onChange={this.setReviewStatusSelection}
              label="Review Status"
              selectedKey={
                this.state.selections.reviewStatus && this.state.enableReviewStatusField
                  ? this.state.selections.reviewStatus
                  : "N/A"
              }
              options={[
                { key: "No reviews", text: "No reviews" },
                { key: "Review required", text: "Review required" },
                { key: "Approved review", text: "Approved review" },
                { key: "Changes requested", text: "Changes requested" },
                { key: "Reviewed by you", text: "Reviewed by you" },
                { key: "Awaiting review from you", text: "Awaiting review from you" },
                { key: "N/A", text: "N/A" }
              ]}
            />
            {description(
              "Track Issues and/or Pull Requests with the single selected review requirement."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
              // onChange={this.setLabelsSelection}
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
              onChange={this.setLastUpdatedSelection}
              min={1}
              defaultValue={this.state.selections.lastUpdated}
              max={31}
            />
            {description(
              "Track Issues and/or Pull Requests that have not been updated for more than a specific number of days."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Issues"
              styles={{ container: { width: 200 } }}
              onChange={this.setstalenessIssueSelection}
              min={1}
              defaultValue={this.state.selections.stalenessIssue}
              max={7}
            />
            {description("The number of days after which an Issue will be considered stale.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Slider
              label="Staleness for Pull Requests"
              styles={{ container: { width: 200 } }}
              onChange={this.setStalenessPullSelection}
              min={1}
              defaultValue={this.state.selections.stalenessPull}
              max={7}
            />
            {description(
              "The number of days after which a Pull Request will be considered stale."
            )()}
          </Stack>
        </Stack>
      </div>
    );
  };
}

export default EditQueryUI;
