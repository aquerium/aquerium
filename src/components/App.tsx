import React from 'react'
//import HomeUI from './HomeUI'
//import NewQueryUI from './NewQueryUI'
//import QueryListUI from './QueryListUI'
import LoginUI from './LoginUI'
import { initializeIcons } from '@uifabric/icons';
//import { getBackgroundShade } from 'office-ui-fabric-react';
initializeIcons();

export class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      //<HomeUI/>
      <LoginUI />
    );
  }
}
