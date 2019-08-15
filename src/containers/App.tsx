/* global chrome */

import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState } from "../state";
import { connect } from "react-redux";
import { toHome } from "../state/actions";

initializeIcons();

/**
 * @property { string } UI the UI that will be displayed
 */
interface IAppViewProps {
  UI: string;
  toHome: () => void;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI
  };
};

class AppView extends React.Component<IAppViewProps> {
  public async componentDidMount(): Promise<void> {
    chrome.storage.sync.get(["token"], result => {
      if (result.token) {
        this.props.toHome();
      }
    });
  }

  public render(): JSX.Element | null {
    switch (this.props.UI) {
      case "Login": {
        return <LoginUI />;
      }
      case "Home": {
        return <HomeUI />;
      }
      default:
        return <LoginUI />;
    }
  }
}

const action = {
  toHome
};

export const App = connect(
  mapStateToProps,
  action
)(AppView);
