/* global chrome */

import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState, IUserInfo } from "../state";
import { connect } from "react-redux";
import { login } from "../state/actions";
import { getQueryMapObj } from "../util/api";

initializeIcons();

/**
 * @property { string } UI the UI that will be displayed
 */
interface IAppViewProps {
  UI: string;
  login: (user: IUserInfo) => void;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI,
    user: state.user
  };
};

class AppView extends React.Component<IAppViewProps> {
  public async componentDidMount(): Promise<void> {
    chrome.storage.sync.get(["token", "username", "gistID"], async result => {
      if (result.token !== "" && result.username != "" && result.gistID != "") {
        const user: IUserInfo = {
          token: result.token,
          username: result.username,
          gistID: result.gistID
        };
        const response = await getQueryMapObj(user);
        if (response.queryMap !== undefined) {
          this.props.login(user);
          // TODO: Call Trip's function passing in response.queryMap
        }
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
      default: {
        return <LoginUI />;
      }
    }
  }
}

const action = {
  login
};

export const App = connect(
  mapStateToProps,
  action
)(AppView);
