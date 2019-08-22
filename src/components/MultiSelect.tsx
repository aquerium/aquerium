import * as React from "react";
import { Stack, TextField, Text, DefaultButton } from "office-ui-fabric-react";
import {
  MultiSelectClassNames,
  closeButtonHovered,
  dropdownAndLabels,
  labels,
  buttonProps
} from "./MultiSelect.styles";

/** @constant
    @type {number} value corresponding to enter key 
*/
const ENTER_KEYCODE = 13;

interface IMultiSelectProps {
  /** The title of the MultiSelect field. */
  label: string;
  /** The labels that are added/removed. */
  items: string[];
  /** The function to be called after adding/removing labels. */
  onChange: (items: string[]) => void;
}

interface IMultiSelectState {
  pendingItem: string;
  errorMessage: string;
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  constructor(props: IMultiSelectProps) {
    super(props);
    this.state = {
      pendingItem: "",
      errorMessage: ""
    };
  }

  public render(): JSX.Element {
    const { label, items } = this.props;
    const { pendingItem, errorMessage } = this.state;

    return (
      <Stack tokens={dropdownAndLabels}>
        <TextField
          label={label}
          validateOnFocusIn
          validateOnFocusOut
          value={pendingItem}
          onChange={this._changePendingItem}
          onKeyDown={this._addItem}
          errorMessage={errorMessage}
        />
        <Stack horizontal wrap tokens={labels} horizontalAlign="start">
          {items.map(item => {
            return (
              <Stack
                className={MultiSelectClassNames.labelButton}
                horizontal
                tokens={labels}
                verticalAlign="center"
                key={item}
              >
                <Text className={MultiSelectClassNames.labelText} nowrap block>
                  {item}
                </Text>
                <DefaultButton
                  onClick={() => this._removeItem(item)}
                  className={MultiSelectClassNames.closeButton}
                  styles={closeButtonHovered}
                  iconProps={buttonProps}
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    );
  }

  private _changePendingItem = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ): void => {
    if (!newValue) {
      newValue = "";
      this.setState({ errorMessage: "" });
    }
    this.setState({ pendingItem: newValue });
  };

  private _addItem = (ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (ev.which !== ENTER_KEYCODE) {
      return;
    }
    const { onChange, items } = this.props;
    this.setState({ pendingItem: this.state.pendingItem.trim() });
    const { pendingItem } = this.state;
    let labelRegex = /^[a-z0-9-_.\\/~+&#@:]+( *[a-z0-9-_.\\/+&#@:]+ *)*$/i;
    if (items && items.includes(pendingItem)) {
      this.setState({ errorMessage: "Label already included." });
      return;
    }
    if (!labelRegex.test(pendingItem)) {
      this.setState({ errorMessage: "Invalid label entry." });
      return;
    }
    if (items) {
      items.push(pendingItem);
      onChange(items);
    }
    this.setState({ pendingItem: "", errorMessage: "" });
  };

  private _removeItem = (item: string): void => {
    const { onChange, items } = this.props;
    if (items) {
      items.splice(items.indexOf(item), 1);
      onChange(items);
    }
  };
}
