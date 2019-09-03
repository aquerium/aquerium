import React from "react";
import { HomeUI } from "../components/HomeUI";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { IState, login, IQuery } from "../state";
import { QueryTaskListUI } from "../components/QueryTaskListUI";
import { connect } from "react-redux";
import { hoveringAndShading } from "../components/HoveringAndShading.styles";
import { Customizer } from "@uifabric/utilities";
import { loadTheme } from "@uifabric/styling";
import { EditQuery } from "../containers/EditQuery";
import { LoadingPage } from "../components/LoadingPage";
import { ErrorPage } from "../containers/ErrorPage";

initializeIcons();

loadTheme({
  palette: {
    themePrimary: "#b65b00",
    themeLighterAlt: "#fcf7f2",
    themeLighter: "#f3e0cc",
    themeLight: "#e9c6a3",
    themeTertiary: "#d39354",
    themeSecondary: "#be6a17",
    themeDarkAlt: "#a35100",
    themeDark: "#8a4500",
    themeDarker: "#653300",
    neutralLighterAlt: "#e2e2e2",
    neutralLighter: "#dedede",
    neutralLight: "#d5d5d5",
    neutralQuaternaryAlt: "#[ink",
    neutralQuaternary: "#bebebe",
    neutralTertiaryAlt: "#b6b6b6",
    neutralTertiary: "#a4b7d5",
    neutralSecondary: "#5c7bab",
    neutralPrimaryAlt: "#2a4e84",
    neutralPrimary: "#1b3e74",
    neutralDark: "#142f57",
    black: "#0f2340",
    white: "#f8f8f8"
  },
  semanticColors: {
    inputBorder: "transparent",
    inputFocusBorderAlt: "transparent"
  }
});

const fieldGroupStyles = [hoveringAndShading, { width: 465, height: 35 }];

const scopedSettings = {
  TextField: {
    styles: {
      fieldGroup: fieldGroupStyles
    }
  },
  DefaultButton: {
    styles: {
      root: [hoveringAndShading, { height: 35 }]
    },
    target: "_blank"
  },
  Dropdown: {
    styles: {
      title: [fieldGroupStyles, { padding: "2px" }]
    }
  },
  MessageBar: {
    styles: {
      root: [hoveringAndShading, { width: 465, height: 45 }],
      innerText: { display: "block", whiteSpace: "normal", height: "40px" }
    }
  },
  MessageBarButton: {
    styles: {
      root: { width: 95, fontSize: 14 }
    }
  },
  Slider: {
    styles: { container: { width: 450 } }
  },
  Link: {
    target: "_blank"
  }
};

interface IAppViewProps {
  /** The UI that will be displayed. */
  UI: string;
  /** The login function attempts to authenticate the user upon opening. */
  login: (currPAT?: string) => void;
  /** The current query to be listed in queryTaskList. */
  currQuery?: IQuery;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI,
    currQuery: state.changeUI.currQuery
  };
};

class AppView extends React.Component<IAppViewProps> {
  public componentDidMount(): void {
    this.props.login();
  }

  public render(): JSX.Element {
    return <Customizer scopedSettings={scopedSettings}>{this._renderUI()}</Customizer>;
  }

  private _renderUI = () => {
    switch (this.props.UI) {
      case "Login": {
        return <LoginUI />;
      }
      case "Home": {
        return <HomeUI />;
      }
      case "EditQuery": {
        return <EditQuery />;
      }
      case "ErrorPage": {
        return <ErrorPage />;
      }
      case "QueryList": {
        return <QueryTaskListUI currQuery={this.props.currQuery!!} />;
      }
      case "Loading": {
        return <LoadingPage loadingMessage={"poop"} />;
      }
      default: {
        return <LoginUI />;
      }
    }
  };
}

const action = {
  login
};

export const App = connect(
  mapStateToProps,
  action
)(AppView);
