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
  IDropdownOption,
  IStyle
} from "office-ui-fabric-react";
import { description } from "./InfoButton";
import { IQuery } from "./IQuery";
import { MultiSelect } from "./MultiSelect";

enum InputStatuses {
  /* Whether the settings are validated and successfully updated to the new (or existing) query */
  successfulEdit = 0,
  /* Whether the current user input is valid or not */
  invalidEdit,
  /* Whether the user has saved the current query edits */
  saved
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
  /* MessageBarButton items, if any, that are the options a user can take given a message */
  actions?: JSX.Element;
  /* Whether or not a message bar should be rendered, given the action the user wants to take */
  renderMessageBar: boolean;
  /* Whether the review status field is enabled or not, depending on if PR's are in the query */
  enableReviewStatusField: boolean;
  /** The current selections the user is making to a query, which will be used to either construct
      a new query or edit an existing one.
  */
  selections: IQuery;
}

interface IEditQueryUIProps {
  currQuery: IQuery;
}

const inputFieldStyles: IStyle = {
  selectors: {
    "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
  },
  boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
  borderRadius: "3px",
  transitionDelay: "0.15s",
  transition: "box-shadow .15s linear, transform .15s linear",
  width: 190
};

export class EditQueryUI extends React.Component<IEditQueryUIProps, IEditQueryUIState> {
  public state: IEditQueryUIState = {
    inputStatus: InputStatuses.successfulEdit,
    messageType: MessageBarType.success,
    message: "",
    renderMessageBar: false,
    enableReviewStatusField: true,
    selections: this.props.currQuery
  };

  private nameRegex = /^[a-z0-9-_.\\/~+&#@]+( *[a-z0-9-_.\\/+&#@]+ *)*$/i;

  private setMessageBarCancel = (): void => {
    if (this.state.inputStatus !== InputStatuses.saved) {
      this.setState({
        messageType: MessageBarType.warning,
        message: "Do you wish to save your changes?",
        actions: (
          <div>
            <MessageBarButton
              text="Save"
              styles={{ root: { width: 90 } }}
              onClick={this.setMessageBarSave}
            />
            {/* Else discard changes and go back to home screen. */}
            <MessageBarButton text="Discard" styles={{ root: { width: 90 } }} />
          </div>
        ),
        renderMessageBar: true
      });
    }
    //Else go back to home screen.
  };

  private setMessageBarSave = (): void => {
    if (
      (this.state.inputStatus === InputStatuses.successfulEdit && this.state.selections.name) ||
      this.state.inputStatus === InputStatuses.saved
    ) {
      this.setState({
        inputStatus: InputStatuses.saved,
        messageType: MessageBarType.success,
        message: "Successfully saved query settings!",
        actions: undefined,
        renderMessageBar: true
      });
      //Use Redux to save query selections
    } else {
      this.setState({
        messageType: MessageBarType.severeWarning,
        message: "Ensure query edits are valid!",
        actions: undefined,
        renderMessageBar: true
      });
    }
  };

  private setMessageBarRemove = (): void => {
    this.setState({
      messageType: MessageBarType.error,
      message: "Are you sure you wish to delete this query?",
      actions: (
        <div>
          {/* Insert query delete Redux and go back to home screen */}
          <MessageBarButton text="Remove" styles={{ root: { width: 95 } }} />
          {/* Cancel and continue editing */}
          <MessageBarButton
            text="Cancel"
            styles={{ root: { width: 90 } }}
            onClick={this.onDismiss}
          />
        </div>
      ),
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
          root: [inputFieldStyles, { width: 250 }]
        }}
        onDismiss={this.onDismiss}
        actions={this.state.actions}
      >
        {this.state.message}
      </MessageBar>
    );
  };

  private checkNameSelection = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    if (value && !this.nameRegex.test(value)) {
      this.setState({ inputStatus: InputStatuses.invalidEdit });
      return "Invalid query name.";
    } else {
      let newStatus = InputStatuses.successfulEdit;
      if (!value) newStatus = InputStatuses.invalidEdit;
      value = value.trim();
      const updatedSelections = update(this.state.selections, { $merge: { name: value } });
      this.setState({ selections: updatedSelections, inputStatus: newStatus });
    }
  };

  private setTypeSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) return;
    const newKey = item.key === "issues and pr" ? undefined : item.key;
    let enableReviewField = true;
    if (newKey === "issues") enableReviewField = false;
    const updatedSelections = update(this.state.selections, {
      $merge: {
        type: newKey as IQuery["type"],
        reviewStatus: enableReviewField
          ? this.state.selections.reviewStatus
          : (undefined as IQuery["reviewStatus"])
      }
    });
    this.setState({ selections: updatedSelections, enableReviewStatusField: enableReviewField });
  };

  private checkRepoSelection = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    if (value && !this.nameRegex.test(value)) {
      this.setState({ inputStatus: InputStatuses.invalidEdit });
      return "Invalid repo name.";
    }
    value = value.trim();
    const updatedSelections = update(this.state.selections, { $merge: { repo: value } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private checkAssigneeSelection = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    if (value && !this.nameRegex.test(value)) {
      this.setState({ inputStatus: InputStatuses.invalidEdit });
      return "Invalid assignee name.";
    }
    value = value.trim();
    const updatedSelections = update(this.state.selections, { $merge: { assignee: value } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private checkAuthorSelection = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    if (value && !this.nameRegex.test(value)) {
      this.setState({ inputStatus: InputStatuses.invalidEdit });
      return "Invalid author name.";
    }
    value = value.trim();
    const updatedSelections = update(this.state.selections, { $merge: { author: value } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private checkMentionSelection = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    if (value && !this.nameRegex.test(value)) {
      this.setState({ inputStatus: InputStatuses.invalidEdit });
      return "Invalid mention name.";
    }
    value = value.trim();
    const updatedSelections = update(this.state.selections, { $merge: { mentions: value } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
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
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private setstalenessIssueSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { stalenessIssue: input } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private setLastUpdatedSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { lastUpdated: input } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private setStalenessPullSelection = (input?: number | undefined): void => {
    const updatedSelections = update(this.state.selections, { $merge: { stalenessPull: input } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
  };

  private setLabelsSelection = (items: string[]): void => {
    const updatedSelections = update(this.state.selections, { $merge: { labels: items } });
    this.setState({ selections: updatedSelections, inputStatus: InputStatuses.successfulEdit });
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
          tokens={{
            childrenGap: 5
          }}
        >
          {this.state.renderMessageBar && this.messageBar()}
          <Stack horizontal horizontalAlign="start">
            <ActionButton
              iconProps={{ iconName: "Back" }}
              styles={{
                icon: { fontSize: 20, color: "black" },
                root: { fontSize: 15 }
              }}
              text="Back"
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
            placeholder="Please enter a title"
            defaultValue={this.state.selections.name}
            validateOnFocusIn
            validateOnFocusOut
            onGetErrorMessage={this.checkNameSelection}
            styles={{ fieldGroup: inputFieldStyles }}
            required
          />
          <Stack horizontal horizontalAlign="center">
            <Dropdown
              required
              styles={{ dropdown: inputFieldStyles }}
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
              defaultValue={this.state.selections.repo}
              validateOnFocusIn
              validateOnFocusOut
              onGetErrorMessage={this.checkRepoSelection}
              styles={{ fieldGroup: inputFieldStyles }}
            />
            {description("List a repository from which to track Issues and/or Pull Requests.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Assignee"
              defaultValue={this.state.selections.assignee}
              validateOnFocusIn
              validateOnFocusOut
              onGetErrorMessage={this.checkAssigneeSelection}
              styles={{ fieldGroup: inputFieldStyles }}
            />
            {description("Track Issues and/or Pull Requests assigned to a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Author"
              defaultValue={this.state.selections.author}
              validateOnFocusIn
              validateOnFocusOut
              onGetErrorMessage={this.checkAuthorSelection}
              styles={{ fieldGroup: inputFieldStyles }}
            />
            {description("Track Issues and/or Pull Requests opened by a specific user.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <TextField
              label="Mention"
              defaultValue={this.state.selections.mentions}
              validateOnFocusIn
              validateOnFocusOut
              onGetErrorMessage={this.checkMentionSelection}
              styles={{ fieldGroup: inputFieldStyles }}
            />
            {description(
              "Track Issues and/or Pull Requests that mention specific users.  Please enter names as comma-separated values."
            )()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <Dropdown
              styles={{ dropdown: inputFieldStyles }}
              disabled={this.state.enableReviewStatusField ? false : true}
              onChange={this.setReviewStatusSelection}
              label="Review Status"
              selectedKey={
                this.state.selections.reviewStatus && this.state.enableReviewStatusField
                  ? this.state.selections.reviewStatus
                  : ""
              }
              options={[
                { key: "No reviews", text: "No reviews" },
                { key: "Review required", text: "Review required" },
                { key: "Approved review", text: "Approved review" },
                { key: "Changes requested", text: "Changes requested" },
                { key: "Reviewed by you", text: "Reviewed by you" },
                { key: "Awaiting review from you", text: "Awaiting review from you" },
                { key: "", text: "N/A" }
              ]}
            />
            {description("Track Pull Requests with the single selected review requirement.")()}
          </Stack>
          <Stack horizontal horizontalAlign="center">
            <MultiSelect
              label="Repo Labels"
              onChange={this.setLabelsSelection}
              inputFieldProps={inputFieldStyles}
              items={this.state.selections.labels ? this.state.selections.labels : []}
            />
            {description("The GitHub labels assigned to particular tasks.")()}
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
