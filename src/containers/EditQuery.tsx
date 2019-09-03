import React from "react";
import update from "immutability-helper";
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
  TagPicker,
  ITag,
  IBasePicker,
  ValidationState,
  Label,
  IPickerItemProps
} from "office-ui-fabric-react";
import { description } from "../components/InfoButton";
import { IQuery, toHome, removeQuery, IState, addOrEditQuery } from "../state";
import {
  EditQueryUIClassNames,
  rootTokenGap,
  actionIcons,
  typeOptions,
  reviewStatusOptions,
  bridgeLabelGap
} from "./EditQuery.styles";
import { connect } from "react-redux";
import { getRepoLabels } from "../util/api";
import { emoji } from "../util";

/** Value corresponding to enter key. */
const ENTER_KEYCODE = 13;

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
  /** Whether the review status field is enabled or not, depending on if PR's are in the query. */
  enableReviewStatusField: boolean;
  /** A list of the suggested labels, given a valid repo has been typed. */
  labelSuggestions: ITag[];
  /**
   * The current selections the user is making to a query, which will be used to either construct
   * a new query or edit an existing one.
   */
  selections: IQuery;
  /** Boolean denoting valid inputs for a given input field. The indices, in order, are query title, repo, author, assignee and mentions. */
  validInputs: boolean[];
}

interface IEditQueryUIProps {
  /** Current query whose properties are being edited. */
  currQuery?: IQuery;
  /** Action that sends the user back to the HomeUI. */
  toHome: () => void;
  /** Action that tells redux and the Gist to modify the current query. */
  addOrEditQuery: (query: IQuery) => void;
  /** Action that tells redux and the Gist to remove the current query. */
  removeQuery: (id: string) => void;
}

const mapStateToProps = (state: IState) => {
  return {
    currQuery: state.changeUI.currQuery
  };
};

class EditQueryUI extends React.Component<IEditQueryUIProps, IEditQueryUIState> {
  public state: IEditQueryUIState = {
    messageType: MessageBarType.success,
    message: "",
    renderMessageBar: false,
    enableReviewStatusField: true,
    labelSuggestions: [],
    selections: this.props.currQuery
      ? this.props.currQuery
      : {
          id: "",
          name: "",
          stalenessIssue: 4,
          stalenessPull: 4,
          lastUpdated: 0,
          tasks: [],
          labels: [],
          labelsToRender: [],
          url: ""
        },
    validInputs: [true, true, true, true, true]
  };

  private _nameRegex = /^[a-z0-9-_.\\/~+&#@:'%"{}[\]()]+( *[a-z0-9-_.\\/+&#@:'%"{}[\]()]+ *)*$/i;

  private _picker = React.createRef<IBasePicker<ITag>>();

  public render = (): JSX.Element => {
    return (
      <>
        <Stack verticalAlign="space-evenly">
          {this.state.renderMessageBar ? (
            this._renderMessageBar()
          ) : (
            <Stack
              horizontal
              verticalAlign="center"
              horizontalAlign="space-evenly"
              className={EditQueryUIClassNames.topBar}
            >
              <ActionButton
                iconProps={actionIcons.back.name}
                styles={actionIcons.back.styles}
                text="Back"
                onClick={this.props.toHome}
              />
              {this.state.selections.id === "" ? (
                <ActionButton
                  iconProps={actionIcons.add.name}
                  styles={actionIcons.add.styles}
                  text="Add"
                  onClick={this._setMessageBarAddOrEdit}
                />
              ) : (
                <ActionButton
                  iconProps={actionIcons.update.name}
                  styles={actionIcons.update.styles}
                  text="Update"
                  onClick={this._setMessageBarAddOrEdit}
                />
              )}
              <ActionButton
                iconProps={actionIcons.remove.name}
                styles={actionIcons.remove.styles}
                text="Remove"
                onClick={this._setMessageBarRemove}
              />
            </Stack>
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
              errorMessage={!this.state.validInputs[0] ? "Invalid query name" : ""}
              required
            />
            <Stack horizontal horizontalAlign="center">
              <Dropdown
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
                    ? "Label suggestions for " +
                      this.state.selections.repo.bold() +
                      " available below."
                    : "No label suggestions available below."
                }
                onChange={this._onChangeRepo}
                onKeyDown={this._validateAndFindRepoLabelsOnEnter}
                validateOnFocusOut
                onGetErrorMessage={this._validateRepoLabelsOnFocusOut}
                defaultValue={this.state.selections.repo}
                errorMessage={!this.state.validInputs[1] ? "Invalid repo name" : ""}
              />
              {description([
                "List a repository from which to track Issues and/or Pull Requests."
              ])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Assignee"
                onChange={this._onChangeAssignee}
                defaultValue={this.state.selections.assignee}
                errorMessage={!this.state.validInputs[3] ? "Invalid assignee name" : ""}
              />
              {description(["Track Issues and/or Pull Requests assigned to a specific user."])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Author"
                onChange={this._onChangeAuthor}
                defaultValue={this.state.selections.author}
                errorMessage={!this.state.validInputs[2] ? "Invalid author name" : ""}
              />
              {description(["Track Issues and/or Pull Requests opened by a specific user."])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <TextField
                label="Mention"
                onChange={this._onChangeMentions}
                defaultValue={this.state.selections.mentions}
                errorMessage={!this.state.validInputs[4] ? "Invalid name" : ""}
              />
              {description(["Track Issues and/or Pull Requests that mention a specific user."])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Dropdown
                disabled={!this.state.enableReviewStatusField}
                onChange={this._setReviewStatusSelection}
                label="Review Status"
                selectedKey={
                  this.state.selections.reviewStatus && this.state.enableReviewStatusField
                    ? this.state.selections.reviewStatus
                    : ""
                }
                options={reviewStatusOptions}
              />
              {description(["Track Pull Requests with the single selected review requirement."])()}
            </Stack>
            <Label>Labels</Label>
            <Stack horizontal horizontalAlign="center" styles={bridgeLabelGap}>
              <TagPicker
                selectedItems={
                  this.state.selections.labelsToRender
                    ? this.state.selections.labelsToRender.map(item => ({
                        key: item,
                        name: item
                      }))
                    : []
                }
                componentRef={this._picker}
                onValidateInput={this._validateInput}
                createGenericItem={this._genericItem}
                onResolveSuggestions={this._typeInPicker}
                onItemSelected={this._onItemSelected}
                onChange={this._onChangeSelectedLabels}
                getTextFromItem={this._getTextFromItem}
                pickerSuggestionsProps={{
                  suggestionsHeaderText:
                    this.state.labelSuggestions.length > 0
                      ? "Suggested labels from " + this.state.selections.repo
                      : "No suggestions available",
                  noResultsFoundText:
                    this.state.labelSuggestions.length > 0
                      ? "Type to find suggestions"
                      : "Add custom labels"
                }}
              />
              {description(["The GitHub labels assigned to particular tasks."], true)()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Slider
                label="Last Updated"
                onChange={this._setLastUpdatedSelection}
                min={1}
                defaultValue={this.state.selections.lastUpdated}
                max={31}
              />
              {description([
                "Track Issues and/or Pull Requests that have not been updated for more than a specific number of days."
              ])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Slider
                label="Staleness for Issues"
                onChange={this._setstalenessIssueSelection}
                min={1}
                defaultValue={this.state.selections.stalenessIssue}
                max={7}
              />
              {description(["The number of days after which an Issue will be considered stale."])()}
            </Stack>
            <Stack horizontal horizontalAlign="center">
              <Slider
                label="Staleness for Pull Requests"
                onChange={this._setStalenessPullSelection}
                min={1}
                defaultValue={this.state.selections.stalenessPull}
                max={7}
              />
              {description([
                "The number of days after which a Pull Request will be considered stale."
              ])()}
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };

  private _renderSelectedLabel = (props: IPickerItemProps<ITag>): void => {};

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
    if (this.state.validInputs.indexOf(false) < 0 && this.state.selections.name) {
      this.setState({
        messageType: MessageBarType.warning,
        message:
          "Are you sure you want to " +
          (this.state.selections.id === "" ? "add" : "update") +
          " this query?",
        actions: (
          <div>
            <MessageBarButton text="Yes" onClick={this._addOrEditQuery} />
            {/* Else discard changes and go back to home screen. */}
            <MessageBarButton text="No" onClick={this._onDismissMessageBar} />
          </div>
        ),
        renderMessageBar: true
      });
    } else {
      this.setState({
        messageType: MessageBarType.severeWarning,
        message: "Ensure query edits are valid!",
        actions: undefined,
        renderMessageBar: true
      });
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
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs[0] = false;
      this.setState({ validInputs: currInputs });
      return;
    }
    currInputs[0] = true;
    if (!newValue) {
      currInputs[0] = false;
    } else {
      newValue = newValue.trim();
      let emojified: string = emoji.emojify(newValue);
      if (emojified) newValue = emojified;
      const updatedSelections = update(this.state.selections, { name: { $set: newValue } });
      this.setState({ selections: updatedSelections });
    }
    this.setState({
      validInputs: currInputs
    });
  };

  private _onChangeRepo = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs[1] = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs[1] = false;
      this.setState({ validInputs: currInputs });
      newValue = newValue.trim();
      return;
    }
    currInputs[1] = true;
    const updatedSelections = update(this.state.selections, { repo: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      labelSuggestions: [],
      validInputs: currInputs
    });
  };

  private _validateAndFindRepoLabelsOnEnter = (
    ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (ev.which !== ENTER_KEYCODE) return;
    this._findRepoLabels();
  };

  private _validateRepoLabelsOnFocusOut = (
    value: string
  ): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined => {
    this._findRepoLabels();
    return undefined;
  };

  private _findRepoLabels = async () => {
    //Ensure a repo has been typed.
    if (!this.state.selections.repo) return;
    //Fetch new labels.
    const result = await getRepoLabels(this.state.selections.repo);
    if (!result.labels) return;
    const updatedLabelSuggestions: ITag[] = result.labels.map(item => ({ key: item, name: item }));
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
    const enableReviewField = newKey !== "issues";
    const updatedSelections = update(this.state.selections, {
      type: {
        $set: newKey as IQuery["type"]
      },
      reviewStatus: {
        $set: enableReviewField
          ? this.state.selections.reviewStatus
          : (undefined as IQuery["reviewStatus"])
      }
    });
    this.setState({ selections: updatedSelections, enableReviewStatusField: enableReviewField });
  };

  private _onChangeAuthor = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs[2] = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs[2] = false;
      this.setState({ validInputs: currInputs });
      newValue = newValue.trim();
      return;
    }
    currInputs[2] = true;
    const updatedSelections = update(this.state.selections, { author: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
  };

  private _onChangeAssignee = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs[3] = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs[3] = false;
      this.setState({ validInputs: currInputs });
      newValue = newValue.trim();
      return;
    }
    currInputs[3] = true;
    const updatedSelections = update(this.state.selections, { assignee: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
  };

  private _onChangeMentions = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (!newValue) {
      let currInputs = this.state.validInputs;
      currInputs[4] = true;
      this.setState({ validInputs: currInputs });
    }
    let currInputs = this.state.validInputs;
    if (newValue && !this._nameRegex.test(newValue)) {
      currInputs[4] = false;
      this.setState({ validInputs: currInputs });
      newValue = newValue.trim();
      return;
    }
    currInputs[4] = true;
    const updatedSelections = update(this.state.selections, { mentions: { $set: newValue } });
    this.setState({
      selections: updatedSelections,
      validInputs: currInputs
    });
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
  };

  private _setstalenessIssueSelection = (input?: number | undefined): void => {
    if (!input) {
      return;
    }
    const updatedSelections = update(this.state.selections, { stalenessIssue: { $set: input } });
    this.setState({ selections: updatedSelections });
  };

  private _setLastUpdatedSelection = (input?: number | undefined): void => {
    if (!input) {
      return;
    }
    const updatedSelections = update(this.state.selections, { lastUpdated: { $set: input } });
    this.setState({ selections: updatedSelections });
  };

  private _setStalenessPullSelection = (input?: number | undefined): void => {
    if (!input) {
      return;
    }
    const updatedSelections = update(this.state.selections, { stalenessIssue: { $set: input } });
    this.setState({ selections: updatedSelections });
  };

  // Private helper functions for dealing with picker (for repo labels).
  private _validateInput = (input: string) => {
    if (!this._nameRegex.test(input)) return ValidationState.invalid;
    return !this.state.selections.labels || this.state.selections.labels.indexOf(input) < 0
      ? ValidationState.valid
      : ValidationState.invalid;
  };

  private _genericItem(input: string, validationState: number) {
    const newItem = { key: input, name: input };
    return newItem;
  }

  private _onChangeSelectedLabels = (items?: ITag[]) => {
    if (!items) return;
    let newSelectedLabels = [];
    let newEmojifiedSelectedLabels = [];
    for (let item of items) {
      let emojified = emoji.emojify(item.name);
      newEmojifiedSelectedLabels.push(emojified);
      newSelectedLabels.push(item.name);
    }
    const updatedSelections = update(this.state.selections, {
      labels: { $set: newSelectedLabels },
      labelsToRender: { $set: newEmojifiedSelectedLabels }
    });
    this.setState({ selections: updatedSelections });
  };

  private _getTextFromItem(item: ITag): string {
    return item.name;
  }

  private _listContainsDocument(tag: ITag, tagList?: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  private _onItemSelected = (item?: ITag): ITag | null => {
    if (!item) return null;
    if (this._picker.current && this._listContainsDocument(item, this._picker.current.items)) {
      return null;
    }
    return item;
  };

  private _typeInPicker = (filterText: string, tagList: ITag[] | undefined): ITag[] => {
    return filterText
      ? this.state.labelSuggestions
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];
  };
}

const action = {
  toHome,
  addOrEditQuery,
  removeQuery
};

export const EditQuery = connect(
  mapStateToProps,
  action
)(EditQueryUI);
