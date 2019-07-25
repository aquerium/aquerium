import React from 'react'
import HomeUI from './HomeUI'
//import NewQueryUI from './NewQueryUI'
//import QueryListUI from './QueryListUI'

export class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <HomeUI />
      //<NewQueryUI />
    );
  }
}
