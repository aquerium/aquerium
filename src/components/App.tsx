import React from "react";
import { connect } from "react-redux";
import { HomeUI } from "./HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { formProperties } from "@uifabric/utilities";
initializeIcons();

// export class App extends React.Component<{}> {
//   public render(): JSX.Element {
//     return (
//       <HomeUI />
//       //<LoginUI />
//     );
//   }
// }

function AppView() {
  return <HomeUI />;
}

export const App = connect()(AppView);
