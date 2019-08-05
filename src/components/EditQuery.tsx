import React from "react";
import { classNames } from "./GridStyles";
import {
  Stack,
  TextField,
  ComboBox,
  ActionButton,
  Slider,
  TagPicker,
  Checkbox,
  TagPickerBase
} from "office-ui-fabric-react";
import { _description } from "./EditQueryInfoButton";

export const EditQueryUI = () => {
  return (
    <div className={classNames.root}>
      <Stack
        horizontalAlign="start"
        verticalAlign="space-evenly"
        styles={{
          root: {
            padding: "2px 0px 2px 35px",
            color: "#1b3e74"
          }
        }}
        tokens={{ childrenGap: 5 }}
      >
        <Stack horizontal horizontalAlign="center">
          <ActionButton
            iconProps={{ iconName: "CheckMark" }}
            styles={{
              icon: { fontSize: 25, color: "green" },
              root: { color: "green", fontSize: 15 }
            }}
            text="Save"
          />
          <ActionButton
            iconProps={{ iconName: "Trash" }}
            styles={{
              icon: { fontSize: 20, color: "red" },
              root: { color: "red", fontSize: 15 }
            }}
            text="Remove"
          />
        </Stack>
        <TextField
          label="Query title"
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
            label="State of Tasks"
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
            "List repositories from which wish to track Issues and/or Pull Requests."
          )()}
        </Stack>
        <Stack horizontal horizontalAlign="center">
          <TextField
            label="Assignee"
            styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
          />
          {_description("Track Issues and/or Pull Requests assigned to specific users.")()}
        </Stack>
        <Stack horizontal horizontalAlign="center">
          <TextField
            label="Author"
            styles={{
              fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }]
            }}
          />
          {_description("Track Issues and/or Pull Requests opened by specific users.")()}
        </Stack>
        <Stack horizontal horizontalAlign="center">
          <TextField
            label="Mention"
            styles={{ fieldGroup: [{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)" }] }}
          />
          {_description("Track Issues and/or Pull Requests that mention specific users.")()}
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
              { key: "Awaiting Review From You", text: "Awaiting Reviewed By You" }
            ]}
          />
          {_description("The number of days after which an Issue will be considered stale. ")()}
        </Stack>
        {/** TODO: INSERT LABEL UI **/}
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
};

export default EditQueryUI;
