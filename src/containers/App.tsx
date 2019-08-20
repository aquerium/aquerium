import React from "react";
import { HomeUI } from "../components/HomeUI";
import { EditQueryUI } from "../components/EditQuery";
import { initializeIcons } from "@uifabric/icons";
import { LoginUI } from "./LoginUI";
import { QueryTaskListUI } from "../components/QueryTaskListUI";
import { IState } from "../state";
import { connect } from "react-redux";
import { hoveringAndShading } from "../components/HoveringAndShadingSyles";
import { Customizer } from "@uifabric/utilities";
import { loadTheme } from "@uifabric/styling";

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

const fieldGroupStyles = [hoveringAndShading, { width: 200 }];

const scopedSettings = {
  TextField: {
    styles: {
      fieldGroup: fieldGroupStyles
    }
  },
  DefaultButton: {
    styles: {
      root: {
        boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,.2)"
      }
    },
    target: "_blank"
  },
  Dropdown: {
    styles: {
      dropdown: fieldGroupStyles
    }
  },
  MessageBar: {
    styles: {
      root: [hoveringAndShading, { width: 265 }]
    }
  },
  MessageBarButton: {
    styles: {
      root: { width: 95 }
    }
  },
  Slider: {
    styles: { container: { width: 200 } }
  },
  Link: {
    target: "_blank"
  }
};

/**
 * @property { string } UI the UI that will be displayed
 */
interface IAppViewProps {
  UI: string;
}

const mapStateToProps = (state: IState) => {
  return {
    UI: state.changeUI.currUI
  };
};

class AppView extends React.Component<IAppViewProps> {
  // TODO: This is currently a stub function to 1) initialize queryMap from gist and 2) determine which UI to show given token
  public async componentDidMount(): Promise<void> {}

  public render(): JSX.Element | null {
    switch (this.props.UI) {
      case "Login": {
        return (
          <Customizer scopedSettings={scopedSettings}>
            <LoginUI />
          </Customizer>
        );
      }
      case "Home": {
        return (
          <Customizer scopedSettings={scopedSettings}>
            <HomeUI />
          </Customizer>
        );
      }
      default:
        return (
          <Customizer scopedSettings={scopedSettings}>
            <HomeUI />
          </Customizer>
        );
    }
  }
}

export const App = connect(mapStateToProps)(AppView);
