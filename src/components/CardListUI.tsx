import React from 'react';
import { List, ITheme, mergeStyleSets, getTheme, IRectangle, Stack, Link } from 'office-ui-fabric-react';

// export const App: React.FunctionComponent = () => {
//   return (
//     <List></List>
//   );
// };

// const hello = (text: string): string => {
//   return text;
// }

interface IListGridExampleClassObject {
  listGridExample: string;
  listGridExampleTile: string;
  listGridExampleSizer: string;
  listGridExamplePadder: string;
  listGridQueryName: string;
  listGridElmCount: string;
  listGridExampleImage: string;
  FocusZone: string;
}

export interface IListGridExampleProps {
  items: any[];
}

const theme: ITheme = getTheme();
const borderColour: string = '1px solid ' + theme.palette.white;
const classNames: IListGridExampleClassObject = mergeStyleSets({
  listGridExample: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative',
    height: 400, maxHeight: 400, width: 400, maxWidth: 400,
    overflowY: 'scroll'
  },
  listGridExampleTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: theme.palette.whiteTranslucent40,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: borderColour
      }
    }
  },
  listGridExampleSizer: {
    paddingBottom: '100%'
  },
  listGridExamplePadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2
  },
  listGridQueryName: {
    background: 'rgba(212, 100, 100, 0.3)',
    color: '#FFFFFF',
    position: 'absolute',
    padding: '20px 5px 0 0',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 24,
    fontFamily: 'Segoe UI Light',
    boxSizing: 'border-box',
    selectors: {
        '&:hover': { background: theme.palette.neutralLight }
      }
  },
  listGridElmCount: {
    fontSize: 92,
    fontFamily: 'Segoe UI Light',
    padding: 0
  },
  listGridExampleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  },
  FocusZone: {
    maxHeight: 400,
    maxWidth: 400
  }
});


const ROWS_PER_PAGE = 10;
const MAX_ROW_HEIGHT = 282;

class CardListUI extends React.Component <IListGridExampleProps> {
  private _columnCount: number = 0;
  private _columnWidth: number = 0;
  private _rowHeight: number = 0;

  public render(): JSX.Element {
    return (
      <Stack horizontal horizontalAlign="space-evenly">
        <List
          className={classNames.listGridExample}
          items={this.props.items}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </Stack>
    );
  }

  private _getItemCountForPage = (itemIndex: number | undefined, surfaceRect?: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = surfaceRect ? Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT) : 0;
      this._columnWidth = surfaceRect ? Math.floor(surfaceRect.width / this._columnCount) : 0;
      this._rowHeight = this._columnWidth;
    }
    // return 1;
    return this._columnCount * ROWS_PER_PAGE;
  };

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  };

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    return (
      <div
        className={classNames.listGridExampleTile}
        data-is-focusable={true}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        {/* The 'item' on line 42 is the next element in the list of queries, from the array in HomeUI.tsx */}
        <div className={classNames.listGridExampleSizer}>
          <div className={classNames.listGridExamplePadder}>
            <Link href="https://github.com" target='_blank'>
              <Stack verticalAlign="start" className={classNames.listGridQueryName} >
                <span>{item}</span>
                <span className={classNames.listGridElmCount}>{index}</span>
              </Stack>
            </Link>
            </div>
        </div>
      </div>
    );
  };
}

export default CardListUI;



