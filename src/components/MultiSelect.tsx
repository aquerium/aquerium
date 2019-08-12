import * as React from "react";
import {
  Stack,
  TextField,
  Text,
  DefaultButton,
  ITextFieldStyleProps,
  IStyle
} from "office-ui-fabric-react";

interface IMultiSelectProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  inputFieldProps: IStyle;
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

  private getTextFieldStyles = (props: ITextFieldStyleProps) => {
    const { required } = props;
    return {
      fieldGroup: [
        this.props.inputFieldProps,
        required && {
          borderColor: this.state.errorMessage
            ? props.theme.semanticColors.actionLink
            : props.theme.semanticColors.errorText
        }
      ]
    };
  };

  public render(): JSX.Element {
    const { label, items } = this.props;
    const { pendingItem, errorMessage } = this.state;

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField
          label={label}
          validateOnFocusIn
          validateOnFocusOut
          value={pendingItem}
          onChange={this._changePendingItem}
          onKeyDown={this._addItem}
          errorMessage={errorMessage}
          styles={this.getTextFieldStyles}
        />
        <Stack horizontal wrap tokens={{ childrenGap: 10, maxWidth: 166 }} horizontalAlign="start">
          {items.map(item => {
            return (
              <Stack
                horizontal
                tokens={{ childrenGap: 10, maxWidth: 166 }}
                verticalAlign="center"
                key={item}
                styles={{
                  root: {
                    paddingLeft: 5,
                    background: "#2b579a",
                    selectors: {
                      "&:hover": { boxShadow: "0 4px 8px 1.5px rgba(0,0,0,.2)" }
                    },
                    boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
                    borderRadius: "3px",
                    transitionDelay: "0.15s",
                    transition: "box-shadow .15s linear, transform .15s linear"
                  }
                }}
              >
                <Text
                  styles={{
                    root: {
                      fontSize: 14,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      color: "white"
                    }
                  }}
                  nowrap
                  block
                >
                  {item}
                </Text>
                <DefaultButton
                  onClick={() => this._removeItem(item)}
                  styles={{
                    root: {
                      minWidth: 0,
                      padding: 0,
                      background: "transparent",
                      border: "none",
                      paddingLeft: 5,
                      paddingRight: 5
                    },
                    rootHovered: {
                      background: `#0078d4 !important`
                    }
                  }}
                  iconProps={{
                    iconName: "ChromeClose",
                    styles: { root: { fontSize: 8, color: "white" } }
                  }}
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
    if (ev.which !== 13) return;
    const { onChange, items } = this.props;
    this.setState({ pendingItem: this.state.pendingItem.trim() });
    const { pendingItem } = this.state;
    let labelRegex = /^[a-z0-9-_.\\/~+&#@]+( *[a-z0-9-_.\\/+&#@]+ *)*$/i;
    if (items && items.includes(pendingItem)) {
      this.setState({ errorMessage: "Label already included." });
      return;
    }
    if (!labelRegex.test(pendingItem)) {
      this.setState({ errorMessage: "Invalid label entry." });
      return;
    }
    if (items) {
      onChange(items);
      items.push(pendingItem);
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
