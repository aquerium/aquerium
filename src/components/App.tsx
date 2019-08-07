import React from "react";
import { HomeUI } from "./HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState } from "../state";
import { connect } from "react-redux";

initializeIcons();
interface IChangeViewProps {
  UI: string; //do we need this? we only need to access the store
}

const mapStateToProps = (state: IState) => {
  return {
    //sync these to the store
    UI: state.changeUI.currUI
  };
};

function AppView(props: IChangeViewProps) {
  console.log(props.UI);
  switch (props.UI) {
    case "Login": {
      return <LoginUI />;
    }
    case "Home": {
      return <HomeUI />;
    }
    //case "List": {
    //  return <QueryListUI />;
    //}
    //case "MakeQuery": {
    //  return <NewQueryUI />;
    //}
    //case "NotificationSettings": {
    //}
    //case "EditQuery": {
    //}
    default:
      return <LoginUI />;
  }
}

export const App = connect(mapStateToProps)(AppView);
