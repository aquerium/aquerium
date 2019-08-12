import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "../components/LoginUI";
import { IState } from "../state";
import { connect } from "react-redux";

initializeIcons();
interface IChangeViewProps {
  UI: string;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI
  };
};

function AppView(props: IChangeViewProps) {
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
