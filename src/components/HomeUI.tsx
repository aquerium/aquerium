import CardListUI from './CardListUI'
import React from 'react'
import TopBarIcons from './TopBarIcons'

const items = [
    'query 1', 'query 2', 'query 3', 'query 4', 'query 5', 'query 6'
  ]

class HomeUI extends React.Component {
    render() : JSX.Element {
        return(
            <div>
                <TopBarIcons />
                <CardListUI items={items} />
            </div>
        );
    }
}

export default HomeUI;