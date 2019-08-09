import React from "react";

import EditQueryUI from "./EditQuery";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();

export class App extends React.Component<{}> {
  public render(): JSX.Element {
    return <EditQueryUI currQuery={{ name: "", stalenessIssue: 4, stalenessPull: 4, tasks: [] }} />;
  }
}
