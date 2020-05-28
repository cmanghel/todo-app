import React from 'react';
import './App.scss';

interface ItemProps {
  task : string;
  completed: boolean;
  //onClic: () => void;
}

interface AppProps {
}
interface AppState {
  items: ItemProps[]
}

function Item(props: ItemProps): JSX.Element {
  return (
    <button>{props.task}</button>
  )
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
        {this.state.items}
      </div>
    </div>
    )
  }
}

export default App;
