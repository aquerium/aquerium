import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containers/App";
import { mergeStyles } from "office-ui-fabric-react";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./state";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#app)": {
      width: 290,
      height: 364,
      margin: 0,
      padding: 0
    }
  }
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
