import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containers/App";
import { mergeStyles } from "office-ui-fabric-react";
import { createStore } from "redux";
import { rootReducer } from "./state";
import { Provider } from "react-redux";

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

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
