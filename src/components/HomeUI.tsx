import { QueryListUI } from "../containers/QueryListUI";
import React from "react";
import { TopBarIcons } from "../containers/TopBarIcons";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

export function HomeUI() {
  return (
    <>
      <TopBarIcons />
      <QueryListUI />
    </>
  );
}
