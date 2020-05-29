import React from 'react';
import './App.scss';

type ItemData = {
  task : string;
  completed: boolean;
}

interface ItemProps {
  value: ItemData;
  onClick: () => void;
}
//eslint-disable-next-line
function ItemRow(props: ItemProps): JSX.Element {
  return (
    <button>{props.value.task}</button>
  )
}

interface AppProps {
}
interface AppState {
  items: ItemData[]
}



class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      items:[
        {task: "some shit to do", completed: true}, 
        {task: "finish this app", completed: false},
      ]
    }
  }
  render(): JSX.Element {
    return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="text"/>
        </div>
      </header>
      <div>
        {this.state.items[0].task}
      </div>
    </div>
    )
  }
}

export default App;
