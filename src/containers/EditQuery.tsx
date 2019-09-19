/*global chrome*/
import React from "react";
import update from "immutability-helper";
import {
  Stack,
  TextField,
  Slider,
  MessageBar,
  MessageBarType,
  MessageBarButton,
  Dropdown,
  IDropdownOption,
  ITag,
  IBasePicker,
  Label,
  Separator,
  Icon,
  ResponsiveMode,
  CommandBar
} from "office-ui-fabric-react";
import { description } from "../components/InfoButton";
import { IQuery, toHome, removeQuery, IState, addOrEditQuery, toQueryList, ILabel } from "../state";
import {
  EditQueryUIClassNames,
  rootTokenGap,
  typeOptions,
  sortingOptions,
  reviewStatusOptions,
  bridgeLabelGap,
  commandBarStyles,
  separatorContentStyles,
  customizeViewDropdown,
  typeDropdown,
  reviewStatusDropdown
} from "./EditQuery.styles";
import { connect } from "react-redux";
import { getRepoLabels } from "../util/api";
import { LabelPicker } from "../components/LabelPicker";

// Value corresponding to enter key.
const ENTER_KEYCODE = 13;

/**
 * Interface to track whether a user input is valid.
 */
interface IInputField {
  [index: string]: boolean
}

interface IEditQueryUIState {
  /**
   * Tracks the the type of message that should be rendered,
   * given the action the user wants to take and the status of the query's settings.
   */
  messageType: MessageBarType;
  /** Tracks the message that should be rendered by the message bar, if needed. */
  message: string;
  /** MessageBarButton items, if any, that are the options a user can take given a message. */
  actions?: JSX.Element;
  /** Whether or not a message bar should be rendered, given the action the user wants to take. */
  renderMessageBar: boolean;
  /** Stores the enabled/disabled feature for all query-able fields. When the Custom Query field is being used, this is set to true. */
  queryFieldsDisabled: boolean;
  /** A list of the suggested labels, given a valid repo has been typed. */
  labelSuggestions: ITag[];
  /** The current selections the user is making to a query, which will be used to either construct a new query or edit an existing one. */
  selections: IQuery;
  /** List denoting valid inputs for query-able fields. */
  validInputs: IInputField;
}

interface IEditQueryUIProps {
  /** Current query whose properties are being edited. */
  currQuery?: IQuery;
  /** Action that sends the user back to the HomeUI. */
  toHome: () => void;
  /** Action that sends the user back to the QueryList UI. */
  toQueryList: (query: IQuery) => void;
  /** Action that tells redux and the Gist to modify the current query. */
  addOrEditQuery: (query: IQuery) => void;
  /** Action that tells redux and the Gist to remove the current query. */
  removeQuery: (id: string) => void;
}

class EditQueryUI extends React.Component<IEditQueryUIProps, IEditQueryUIState> {
  public state: IEditQueryUIState = {
    messageType: MessageBarType.success,
    message: "",
    renderMessageBar: false,
    queryFieldsDisabled: (this.props.currQuery && this.props.currQuery.customField && this.props.currQuery.customField !== "") ? true : false,
    labelSuggestions: [],
    selections: this.props.currQuery
      ? this.props.currQuery
      : {
        id: "",
        name: "",
        lastUpdated: 0,
        reasonableCount: 0,
        tasks: [],
        labels: [],
        url: "",
        customViews: ["author", "lastUpdated", "repo", "labels"],
        markedAsRead: false,
        sorting: "default"
      },
    validInputs: {
      name: true,
      repo: true,
      assignee: true,
      mentions: true,
      customField: true,
      author: true,
      reasonableCount: true
    }
  };

  private _nameRegex = /^[ !a-z0-9-_.\\/~+&#@:()'[\]]+( *[ !a-z0-9-_.\\/+&#@:()'[\]]+ *)*$/i;
  private _customQueryRegex = /^[ <>=!a-z0-9-_.\\/~+&#@:()"'[\]]+( *[ <>=!a-z0-9-_.\\/+&#@:()"'[\]]+ *)*$/i;
  private _otherFieldRegex = /^[!a-z0-9-_.\\/~+&#@()'[\]]+( *[!a-z0-9-_.\\/+&#@()'[\]]+ *)*$/i;
  private _numberRegex = /^[0-9]*$/i;

  private _picker = React.createRef<IBasePicker<ITag>>();
  private _customViewsOptions = [
    { key: "type", text: "Type of tasks" },
    { key: "repo", text: "Repo" },
    { key: "assignees", text: "Assignees" },
    { key: "author", text: "Author" },
    { key: "labels", text: "Labels" },
    { key: "lastUpdated", text: "Date Last Updated" },
    { key: "createdAt", text: "Date Created" }
  ];

  public render = (): JSX.Element => {
    return (
      <>
        <Stack verticalAlign="space-evenly">
          {this.state.renderMessageBar ? (
            this._renderMessageBar()
          ) : (
              <div className={EditQueryUIClassNames.commandBarContainer}>
                <CommandBar
                  styles={commandBarStyles}
                  items={this.state.selections.id === "" ? this._addItems : this._updateItems}
                />
              </div>
            )}
          <Stack
            horizontalAlign="start"
            className={EditQueryUIClassNames.fieldsRoot}
            tokens={rootTokenGap}
          >
            <TextField
              label="Your query title"
              placeholder="Please enter a title"
              onChange={this._onChangeTitle}
              defaultValue={this.state.selections.name}
              errorMessage={!this.state.validInputs.name ? "Invalid query name" : ""}
              required
            />
            <Stack horizontal horizontalAlign="center">
              <Dropdown
                styles={typeDropdown}
                responsiveMode={ResponsiveMode.large}
                disabled={this.state.queryFieldsDisabled}
                required
                onChange={this._setTypeSelection}
                label="Type of tasks"
                selectedKey={this.state.selections.type || "issues and pr"}
                options={typeOptions}
              />
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Repo"
                description={
                  this.state.labelSuggestions.length > 0 && this.state.selections.repo
                    ? "Label suggestions for " + this.state.selections.repo + " available below."
                    : "No label suggestions available below."
                }
                onChange={this._onChangeRepo}
                onKeyDown={this._validateAndFindRepoLabelsOnEnter}
                disabled={this.state.queryFieldsDisabled}
                validateOnFocusOut
                onGetErrorMessage={this._validateRepoLabelsOnFocusOut}
                defaultValue={this.state.selections.repo}
                errorMessage={!this.state.validInputs ? "Invalid repo name" : ""}
              />
              {description("List a repository from which to track Issues and/or Pull Requests.")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Assignee"
                onChange={this._onChangeAssignee}
                disabled={this.state.queryFieldsDisabled}
                defaultValue={this.state.selections.assignee}
                errorMessage={!this.state.validInputs.assignee ? "Invalid assignee name" : ""}
              />
              {description("Track Issues and/or Pull Requests assigned to a specific user.")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Author"
                onChange={this._onChangeAuthor}
                disabled={this.state.queryFieldsDisabled}
                defaultValue={this.state.selections.author}
                errorMessage={!this.state.validInputs.author ? "Invalid author name" : ""}
              />
              {description("Track Issues and/or Pull Requests opened by a specific user.")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Mention"
                onChange={this._onChangeMentions}
                disabled={this.state.queryFieldsDisabled}
                defaultValue={this.state.selections.mentions}
                errorMessage={!this.state.validInputs.mentions ? "Invalid name" : ""}
              />
              {description("Track Issues and/or Pull Requests that mention a specific user.")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Custom Query (Deactivates Other Fields!)"
                onChange={this._onChangeCustomField}
                defaultValue={this.state.selections.customField}
                errorMessage={!this.state.validInputs.customField ? "Invalid filters" : ""}
              />
              {description("Feeling like a pro? Enter custom filters just like you would on GitHub!")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Dropdown
                styles={reviewStatusDropdown}
                responsiveMode={ResponsiveMode.large}
                disabled={this.state.queryFieldsDisabled || (this.state.selections.type && this.state.selections.type === "issue")}
                onChange={this._setReviewStatusSelection}
                label="Review Status"
                selectedKey={
                  this.state.selections.reviewStatus && !this.state.queryFieldsDisabled
                    ? this.state.selections.reviewStatus
                    : ""
                }
                options={reviewStatusOptions}
              />
              {description("Track Pull Requests with the single selected review requirement.")()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Reasonable Task Count"
                defaultValue={this.state.selections.reasonableCount.toString()}
                validateOnFocusIn
                validateOnFocusOut
                onChange={this._onChangeReasonableCountSelection}
                errorMessage={!this.state.validInputs.reasonableCount ? "Invalid number input" : ""}
              />
              {description(
                "The number of tasks in this query that, if exceeded, would be considered unreasonable. " +
                "As tasks accumulate above reasonable count, the background of the query tile will turn more red as a warning."
              )()}
            </Stack>
            <Label>Labels</Label>
            <Stack horizontal horizontalAlign="center" styles={bridgeLabelGap}>
              <LabelPicker
                selectedLabels={this.state.selections.labels}
                disabled={this.state.queryFieldsDisabled}
                suggestedLabels={this.state.labelSuggestions}
                onChange={this._onChangeLabels}
                repo={this.state.selections.repo}
              />
              {description("The GitHub labels assigned to particular tasks.", true)()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Dropdown
                styles={typeDropdown}
                responsiveMode={ResponsiveMode.large}
                disabled={this.state.queryFieldsDisabled}
                onChange={this._setSortingSelection}
                label="Sort By"
                selectedKey={this.state.selections.sorting}
                options={sortingOptions}
              />
              {description(
                "Choose the order of your results."
              )()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Slider
                label="Last Updated"
                disabled={this.state.queryFieldsDisabled}
                onChange={this._setLastUpdatedSelection}
                min={0}
                defaultValue={this.state.selections.lastUpdated}
                max={31}
              />
              {description(
                "Track Issues and/or Pull Requests that have not been updated for more than a specific number of days."
              )()}
            </Stack>
            <Separator className={EditQueryUIClassNames.separator} styles={separatorContentStyles}>
              <Icon iconName="RedEye" className={EditQueryUIClassNames.separatorIcon} />
            </Separator>
            <Stack horizontal horizontalAlign="center">
              <Dropdown
                styles={customizeViewDropdown}
                responsiveMode={ResponsiveMode.large}
                label="Customize Task Tile Fields"
                multiSelect
                selectedKeys={this.state.selections.customViews}
                options={this._customViewsOptions}
                onChange={this._setCustomViews}
              />
              {description(
                "Select the fields you wish to prioritize while viewing the task list."
              )()}
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };

  private _onClickToQueryList = (): void => {
    this.props.toQueryList(this.state.selections);
  };

  private _renderMessageBar = (): JSX.Element => {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="space-around"
        className={EditQueryUIClassNames.messageBar}
      >
        <MessageBar
          isMultiline={false}
          messageBarType={this.state.messageType}
          onDismiss={this._onDismissMessageBar}
          actions={this.state.actions}
        >
          {this.state.message}
        </MessageBar>
      </Stack>
    );
  };

  private _setMessageBarAddOrEdit = (): void => {
    let validEdits = true;
    if (Object.keys(this.state.validInputs).some(k => !this.state.validInputs[k])) {
      validEdits = false;
    }

    if (!validEdits || !this.state.selections.name) {
      this.setState({
        messageType: MessageBarType.severeWarning,
        message: "Ensure query edits are valid!",
        actions: undefined,
        renderMessageBar: true
      });
    } else {
      this._addOrEditQuery();
    }
  };

  private _addOrEditQuery = (): void => {
    this.props.addOrEditQuery(this.state.selections);
    this.props.toHome();
  };

  private _setMessageBarRemove = (): void => {
    this.setState({
      messageType: MessageBarType.error,
      message: "Are you sure you wish to delete this query?",
      actions: (
        <div>
          {/* Insert query delete Redux and go back to home screen. */}
          <MessageBarButton text="Remove" onClick={this._onRemove} />
          {/* Cancel and continue editing. */}
          <MessageBarButton text="Cancel" onClick={this._onDismissMessageBar} />
        </div>
      ),
      renderMessageBar: true
    });
  };

  private _addItems = [
    {
      key: "add",
      name: "Save",
      ariaLabel: "Save Query",
      iconProps: { iconName: "Save", color: "Green" },
      onClick: this._setMessageBarAddOrEdit,
      buttonStyles: {
        root: { fontSize: 16, backgroundColor: "rgba(240, 240, 240, 0.7)" },
        icon: { fontSize: 20, color: "Green" }
      }
    },
    {
      key: "return",
      name: "Cancel",
      ariaLabel: "Cancel",
      iconProps: { iconName: "Cancel" },
      onClick: this.props.toHome,
      buttonStyles: {
        root: { fontSize: 16, backgroundColor: "rgba(240, 240, 240, 0.7)" },
        icon: { fontSize: 20, color: "Gray" }
      }
    }
  ];

  private _updateItems = [
    {
      key: "cancel",
      name: "Cancel",
      ariaLabel: "Cancel",
      iconProps: { iconName: "Cancel" },
      onClick: this._onClickToQueryList,
      buttonStyles: {
        root: { fontSize: 16, backgroundColor: "rgba(240, 240, 240, 0.7)" },
        icon: { fontSize: 20, color: "Gray" }
      }
    },
    {
      key: "update",
      name: "Update",
      ariaLabel: "Update",
      iconProps: { iconName: "Save", color: "Green" },
      onClick: this._setMessageBarAddOrEdit,
      buttonStyles: {
        root: { fontSize: 16, backgroundColor: "rgba(240, 240, 240, 0.7)" },
        icon: { fontSize: 20, color: "Green" }
      }
    },
    {
      key: "remove",
      name: "Remove",
      ariaLabel: "Remove",
      iconProps: { iconName: "Trash", color: "Red" },
      onClick: this._setMessageBarRemove,
      buttonStyles: {
        root: { fontSize: 16, backgroundColor: "rgba(240, 240, 240, 0.7)" },
        icon: { fontSize: 20, color: "Red" }
      }
    }
  ];

  private _onRemove = (): void => {
    const queryID: string = this.state.selections.id;
    if (queryID !== "") {
      // If the ID exists, this is a real query we should remove.
      this.props.removeQuery(queryID);
    }
    this.props.toHome();
  };

  private _onDismissMessageBar = (): void => {
    this.setState({ renderMessageBar: false });
  };

  private _onChangeTitle = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input.
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs.name = false;
      this.setState({ validInputs: currInputs });
    } else {
      currInputs.name = true;
    }

    // Update value in state and add to local storage.
    newValue = newValue ? newValue.trim() : "";
    const updatedSelections = update(this.state.selections, { name: { $set: newValue } });
    this.setState({ selections: updatedSelections, validInputs: currInputs });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeRepo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. An empty input is valid.
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs.repo = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._otherFieldRegex.test(newValue)) {
      currInputs.repo = false;
      this.setState({ validInputs: currInputs });
      return;
    }

    // Update value in state and add to local storage.
    newValue = newValue ? newValue.trim() : "";
    currInputs.repo = true;
    const updatedSelections = update(this.state.selections, { repo: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      labelSuggestions: [],
      validInputs: currInputs
    });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _validateAndFindRepoLabelsOnEnter = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (ev.which !== ENTER_KEYCODE) return;
    this._findRepoLabels();
  };

  private _validateRepoLabelsOnFocusOut = (value: string): undefined => {
    this._findRepoLabels();
    return undefined;
  };

  private _findRepoLabels = async (): Promise<void> => {
    //Ensure a repo has been typed.
    if (!this.state.selections.repo) return;
    //Fetch new labels.
    const result = await getRepoLabels(this.state.selections.repo);
    if (!result.labels) return;
    const updatedLabelSuggestions: ITag[] = result.labels.map(item => ({
      key: item.name + "/#" + item.color,
      name: item.name
    }));
    this.setState({
      labelSuggestions: updatedLabelSuggestions
    });
  };

  private _setTypeSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) {
      return;
    }
    const newKey = item.key === "issues and pr" ? undefined : item.key;
    const disableReviewField = (newKey === "issue");
    const updatedSelections = update(this.state.selections, {
      type: {
        $set: newKey as IQuery["type"]
      },
      reviewStatus: {
        $set: disableReviewField
          ? this.state.selections.reviewStatus
          : (undefined as IQuery["reviewStatus"])
      }
    });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _setSortingSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) {
      return;
    }
    const newKey = item.key;
    const updatedSelections = update(this.state.selections, {
      sorting: {
        $set: newKey as IQuery["sorting"]
      }
    });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeAuthor = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. An empty input is valid.
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs.author = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._otherFieldRegex.test(newValue)) {
      currInputs.author = false;
      this.setState({ validInputs: currInputs });
      return;
    }

    // Update value in state and add to local storage.
    newValue = newValue ? newValue.trim() : "";
    currInputs.author = true;
    const updatedSelections = update(this.state.selections, { author: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeAssignee = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. An empty input is valid.
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs.assignee = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._otherFieldRegex.test(newValue)) {
      currInputs.assignee = false;
      this.setState({ validInputs: currInputs });
      return;
    }

    // Update value in state and add to local storage.
    newValue = newValue ? newValue.trim() : "";
    currInputs.assignee = true;
    const updatedSelections = update(this.state.selections, { assignee: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeMentions = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. An empty input is valid.
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs.mentions = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._otherFieldRegex.test(newValue)) {
      currInputs.mentions = false;
      this.setState({ validInputs: currInputs });
      return;
    }

    // Update value in state and add to local storage.
    newValue = newValue ? newValue.trim() : "";
    currInputs.mentions = true;
    const updatedSelections = update(this.state.selections, { mentions: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeCustomField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. If this box is typed in, all other fields are deactivated.
    if (!newValue || newValue === "") {
      this.setState({ queryFieldsDisabled: false });
    } else {
      this.setState({ queryFieldsDisabled: true });
    }
    // If our input is valid, but it fails the regex.
    let currInputs = this.state.validInputs;
    if (newValue && !this._customQueryRegex.test(newValue)) {
      currInputs.customField = false;
      this.setState({ validInputs: currInputs });
      return;
    }

    // Parse the matching fields in the custom query, apply them to state, and store in local storage.
    newValue = newValue ? newValue.trim() : "";
    currInputs.customField = true;
    const updatedSelections = this._updateSelections(newValue);
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _setReviewStatusSelection = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) {
      return;
    }
    const newKey = item.key === "N/A" ? undefined : item.key;
    const updatedSelections = update(this.state.selections, {
      reviewStatus: { $set: newKey as IQuery["reviewStatus"] }
    });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _setLastUpdatedSelection = (input?: number | undefined): void => {
    if (!input) {
      return;
    }
    const updatedSelections = update(this.state.selections, { lastUpdated: { $set: input } });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeReasonableCountSelection = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Check to see if valid input. An empty input is valid.
    let currInputs = this.state.validInputs;
    if (newValue && !this._numberRegex.test(newValue)) {
      currInputs.reasonableCount = false;
    } else {
      currInputs.reasonableCount = true;
    }

    // Update value in state and add to local storage.
    const updatedSelections = update(this.state.selections, {
      reasonableCount: { $set: newValue ? parseInt(newValue.trim()) : 0 }
    });
    this.setState({ selections: updatedSelections, validInputs: currInputs });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _onChangeLabels = (items: ILabel[]) => {
    const updatedSelections = update(this.state.selections, {
      labels: { $set: items }
    });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };

  private _setCustomViews = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (!item) {
      return;
    }
    const newSelections = [...this.state.selections.customViews];
    if (item.selected) {
      newSelections.push(item.key as string);
    } else {
      const currIndex = newSelections.indexOf(item.key as string);
      if (currIndex > -1) {
        newSelections.splice(currIndex, 1);
      }
    }
    const updatedSelections = update(this.state.selections, {
      customViews: { $set: newSelections }
    });
    this.setState({ selections: updatedSelections });
    chrome.storage.local.set({ query: this.state.selections });
  };


  // Helper function that interprets a custom query and returns an IQuery with the correctly filled-in fields.
  private _updateSelections = (field: string): IQuery => {
    const labelArr = field.match(/label:"((([^"])*)?)"/g);
    if (!labelArr) {
      return this._updateSelectionsHelper(field.trim().split(" "), field);
    }
    var remainder = field;
    labelArr.forEach(function (elem) {
      remainder = remainder.replace(elem, "");
      remainder = remainder.replace(/  +/g, " ");
    });
    const newArr = labelArr.concat(remainder.trim().split(" "));
    const newQuery = this._updateSelectionsHelper(newArr, field);
    return newQuery;
  };

  // Helper to the helper function that returns a modified copy of this.state.selections. 
  private _updateSelectionsHelper = (optionsArr: string[], oldField: string): IQuery => {
    const type = (optionsArr.includes("is:issue") ? "issue" : (optionsArr.includes("is:pr") ? "pr" : undefined));
    const repo: string = optionsArr.find(function (elem) {
      return elem.includes("repo:");
    }) || "";
    const assignee: string = optionsArr.find(function (elem) {
      return elem.includes("assignee:");
    }) || "";
    const author: string = optionsArr.find(function (elem) {
      return elem.includes("author:");
    }) || "";
    const mentions: string = optionsArr.find(function (elem) {
      return elem.includes("mentions:");
    }) || "";
    const newQuery: IQuery = update(this.state.selections, {
      type: { $set: type },
      repo: { $set: repo.split("repo:")[1] },
      assignee: { $set: assignee.split("assignee:")[1] },
      author: { $set: author.split("author:")[1] },
      customField: { $set: oldField },
      mentions: { $set: mentions.split("mentions:")[1] },
      rawQueryField: { $set: this._getQueryFormatted(oldField) }
    });
    return (newQuery);
  };

  // Helper function that returns a well-formatted query if the user entered a custom query.
  private _getQueryFormatted(field: string): string {
    const labelArr = field.match(/label:"((([^"])*)?)"/g);
    if (!labelArr) return field;
    var remainder = field;
    // Loop through the string and cut out every label.
    labelArr.forEach(function (elem) {
      remainder = remainder.replace(elem, "");
      // Ensure that we have no spacing errors.
      remainder = remainder.replace(/  +/g, " ");
    });
    // Remove white space and add '+' signs in lieu of every space.
    var newStr = remainder.trim().replace(/ /g, "+");
    labelArr.forEach(function (elem) {
      newStr = newStr.concat('+', elem);
    });
    return newStr;
  };

}

const mapStateToProps = (state: IState) => ({
  currQuery: state.changeUI.currQuery
});

const action = {
  toHome,
  addOrEditQuery,
  removeQuery,
  toQueryList
};

export const EditQuery = connect(
  mapStateToProps,
  action
)(EditQueryUI);
