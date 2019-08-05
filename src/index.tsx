import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { mergeStyles } from "office-ui-fabric-react";

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#app)": {
      width: 290,
      height: 274,
      margin: 0,
      padding: 0
    }
  }
});

ReactDOM.render(<App />, document.getElementById("app"));
