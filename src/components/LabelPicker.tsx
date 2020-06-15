import React from "react";
import { TagPicker, ValidationState, ITag, IBasePicker } from "office-ui-fabric-react";
import { ILabel } from "../state";

interface ILabelPickerProps {
  /** The labels that are added/removed. */
  selectedLabels: ILabel[] | undefined;
  /** The repo name for suggestions. */
  repo: string | undefined;
  /** The suggested labels from a given repo. */
  suggestedLabels: ITag[];
  /** The function to be called after adding/removing labels. */
  onChange: (items: ILabel[]) => void;
  /** Controls whether the picker is disabled or not. */
  disabled: boolean;
}

export class LabelPicker extends React.Component<ILabelPickerProps> {
  constructor(props: ILabelPickerProps) {
    super(props);
    this.state = {
      suggestedLabels: []
    };
  }

  /**
   * Ensures a valid repo is typed.
   */
  private _nameRegex = /^[a-z0-9-_.\\/~+&#@:()"'[\]]+( *[a-z0-9-_.\\/+&#@:()"'[\]]+ *)*$/i;

  private _picker = React.createRef<IBasePicker<ITag>>();

  public render(): JSX.Element {
    const { selectedLabels, suggestedLabels, repo } = this.props;

    return (
      <TagPicker
        selectedItems={
          selectedLabels
            ? selectedLabels.map(label => ({
              key: label.name + "/#" + label.color,
              name: label.name
            }))
            : []
        }
        disabled={this.props.disabled}
        componentRef={this._picker}
        onValidateInput={this._validateInput}
        createGenericItem={this._genericItem}
        onResolveSuggestions={this._typeInPicker}
        onItemSelected={this._onItemSelected}
        onChange={this._onChangeSelectedLabels}
        getTextFromItem={this._getTextFromItem}
        pickerSuggestionsProps={{
          suggestionsHeaderText:
            suggestedLabels.length > 0
              ? "Suggested labels from " + repo
              : "No suggestions available",
          noResultsFoundText:
            suggestedLabels.length > 0 ? "Type to find suggestions" : "Add custom labels"
        }}
      />
    );
  }

  /**
   * Validates the input label given a regex and if it has been selected.
   */
  private _validateInput = (input: string) => {
    if (!this._nameRegex.test(input)) return ValidationState.invalid;
    const { selectedLabels } = this.props;
    return !selectedLabels || selectedLabels.map(label => label.name).indexOf(input) < 0
      ? ValidationState.valid
      : ValidationState.invalid;
  };

  /**
   * Makes a generic item if not in the suggestions.
   */
  private _genericItem(input: string, validationState: number) {
    // Default to a gray tone/background for this label.
    const newItem = { key: input + "/#A9A9A9", name: input };
    return newItem;
  }

  /**
   * Updates the selected labels after removal and addition.
   */
  private _onChangeSelectedLabels = (items?: ITag[]) => {
    if (!items) return;
    let newSelectedLabels = items.map(item => ({
      name: item.name,
      // In this case we know we're dealing with strings.
      color: (item.key as string).substring((item.key as string).lastIndexOf("#") + 1)
    }));
    this.props.onChange(newSelectedLabels);
  };

  private _getTextFromItem(item: ITag): string {
    return item.name;
  }

  /**
   * Whether or not the list contains the searched label.
   */
  private _listContainsLabel(tag: ITag, tagList?: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  /**
   * Returns an item (if avaialable, is valid and is not already picked) after being selected.
   */
  private _onItemSelected = (item?: ITag): ITag | null => {
    if (!item) return null;
    if (this._picker.current && this._listContainsLabel(item, this._picker.current.items)) {
      return null;
    }
    return item;
  };

  /**
   * Returns the list of suggestions after filtering given the input.
   */
  private _typeInPicker = (filterText: string, tagList: ITag[] | undefined): ITag[] => {
    if (!filterText) return [];
    const { suggestedLabels } = this.props;
    return suggestedLabels
      .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1) // Find all tags that contain filterText.
      .filter(tag => !this._listContainsLabel(tag, tagList))
      .concat([this._genericItem(filterText, ValidationState.valid)]); // Find all tags that are not already selected.
  };
}
