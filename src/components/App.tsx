import React from "react";

import HomeUI from "./HomeUI";
// import LoginUI from "./LoginUI";
// import EditQueryUI from "./EditQuery";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();

export class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <HomeUI />
      // <LoginUI />
      // <EditQueryUI />
    );
  }
}
