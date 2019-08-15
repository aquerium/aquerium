import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState, queryListType } from "../state";
import { connect } from "react-redux";
import { loadQueryMap } from "../state";

initializeIcons();

/**
 * @property { string } UI the UI that will be displayed
 */
interface IAppViewProps {
  UI: string;
  loadQueryMap: () => void;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI
  };
};

class AppView extends React.Component<IAppViewProps> {
  // TODO: This is currently a stub function to 1) initialize queryMap from gist and 2) determine which UI to show given token
  public async componentDidMount(): Promise<void> {
    this.props.loadQueryMap();
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
  loadQueryMap
};

export const App = connect(
  mapStateToProps,
  action
)(AppView);
