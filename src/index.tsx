import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { mergeStyles } from 'office-ui-fabric-react';


// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: 400,
      width: 400,
    }
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
