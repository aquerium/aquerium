import * as React from "react";
import update from "immutability-helper";
import { Stack, TextField, Text, DefaultButton } from "office-ui-fabric-react";

interface IMultiSelectProps {
  label: string;
  onChange: (items: string[]) => void;
}

interface IMultiSelectState {
  pendingItem: string;
  items: string[];
}

export class MultiSelect extends React.Component<IMultiSelectProps, IMultiSelectState> {
  constructor(props: IMultiSelectProps) {
    super(props);
    this.state = {
      items: [],
      pendingItem: ""
    };
  }

  public render(): JSX.Element {
    const { label } = this.props;
    const { pendingItem, items } = this.state;

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField
          label={label}
          value={pendingItem}
          onChange={this._changePendingItem}
          onKeyDown={this._addItem}
          styles={{
            root: { width: 166 },
            fieldGroup: { boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }
          }}
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
                    background: "#c8c8c8",
                    boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)",
                    borderRadius: 3
                  }
                }}
              >
                <Text
                  styles={{ root: { fontSize: 14, textOverflow: "ellipsis", overflow: "hidden" } }}
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
                      background: `#a6a6a6 !important`
                    }
                  }}
                  iconProps={{
                    iconName: "ChromeClose",
                    styles: { root: { fontSize: 8 } }
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
    if (!newValue) return;
    this.setState({ pendingItem: newValue });
  };

  private _addItem = (ev: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (ev.which !== 13 || this.state.pendingItem === "") {
      return;
    }
    const { onChange } = this.props;
    const { pendingItem, items } = this.state;
    if (items.includes(pendingItem)) return;
    const updatedSelections = update(this.state.items, { $push: [pendingItem] });
    this.setState({ items: updatedSelections });
    onChange(items);
    this.setState({ pendingItem: "" });
  };

  private _removeItem = (item: string): void => {
    const { onChange } = this.props;
    const { items } = this.state;
    items.splice(items.indexOf(item), 1);
    onChange(items);
  };
}
