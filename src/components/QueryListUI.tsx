import * as React from "react";
import {
  Stack,
  Text,
  TextField,
  ComboBox,
  ITextFieldProps,
  IconButton,
  Callout,
  getId
} from "office-ui-fabric-react";

const [isCalloutVisible, toggleCallout] = React.useState(false);
// string _descriptionId = "";
//  = getId('description');
//_iconButtonId: string = getId("iconButton");

const _onIconClick = (): void => {
  toggleCallout(!isCalloutVisible);
};

const _onDismiss = (): void => {
  toggleCallout(false);
};

const _onRenderLabel = (props: ITextFieldProps): JSX.Element => {
  return (
    <>
      <Stack horizontal verticalAlign="center">
        <span>{props.label}</span>
        <IconButton
          //   id={_iconButtonId}
          iconProps={{ iconName: "Info" }}
          title="Info"
          ariaLabel="Info"
          onClick={_onIconClick}
          styles={{ root: { marginBottom: -3 } }}
        />
      </Stack>
      {isCalloutVisible && (
        <Callout
          //target={"#" + _iconButtonId}
          setInitialFocus={true}
          onDismiss={_onDismiss}
          //ariaDescribedBy={_descriptionId}
          role="alertdialog"
        >
          <span>
            {/* <span id={_descriptionId}> */}
            The custom label includes an IconButton that displays this Callout on click.
          </span>
        </Callout>
      )}
    </>
  );
};

export const QueryListUI = () => {
  return (
    <Stack horizontalAlign="center" verticalAlign="space-evenly">
      <Text styles={{ root: { fontSize: 10, color: "#1b3e74" } }}>Hello</Text>
      <TextField label="Query title" required />
      <ComboBox
        required
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
      <ComboBox
        multiSelect
        label="Type of states"
        allowFreeform
        autoComplete="on"
        defaultSelectedKey={["open", "closed"]}
        options={[{ key: "open", text: "Open" }, { key: "closed", text: "Closed" }]}
      />
      <TextField label="Repo" required onRenderLabel={_onRenderLabel} />
      <TextField label="Query title" required />
      <TextField label="Query title" required />
    </Stack>
  );
};

export default QueryListUI;
