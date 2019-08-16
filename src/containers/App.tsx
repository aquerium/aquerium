import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState, queryListType } from "../state";
import { connect } from "react-redux";
import { updateMap } from "../state";

initializeIcons();

/**
 * @property { string } UI the UI that will be displayed
 */
interface IAppViewProps {
  UI: string;
  updateMap: (list: queryListType) => void;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI,
    list: state.queryList
  };
};

class AppView extends React.Component<IAppViewProps> {
  // TODO: This is currently a stub function to 1) initialize queryMap from gist and 2) determine which UI to show given token
  public async componentDidMount(): Promise<void> {
    //Check to see if credentials exist (local storage)
    //if not, go to loginUI
    //if they do, call getObjQueryMap
    //if this call fails, PAT is probably invalid, go to login UI
    //if this succeeds, we have valid credentials AND a valid queryMAP
    //call login(userInfo)
    //this.props.updateMap(list);
    //the order of these calls doesn't really matter
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
  updateMap
};

export const App = connect(
  mapStateToProps,
  action
)(AppView);
