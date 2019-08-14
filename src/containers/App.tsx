import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState } from "../state";
import { connect } from "react-redux";

initializeIcons();

/**
 * @property { string } UI the UI that will be displayed
 */
interface IChangeViewProps {
  UI: string;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI
  };
};

function AppView(props: IChangeViewProps) {
  //componentdidmount somewhere in here, do the mapstate to props thing with login/logout call getquerymap
  switch (props.UI) {
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

export const App = connect(mapStateToProps)(AppView);
