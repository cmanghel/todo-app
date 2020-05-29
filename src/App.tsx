import React from 'react';
import './App.scss';
import _ from "lodash";

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

  renderTask(i: number): JSX.Element {
    return (
      <div>
        {this.state.items[i].task}
      </div>
    )
  }

  render(): JSX.Element {
    const n = this.state.items.length;
    const tasks = _.range(n).map((i) => this.renderTask(i))
    return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="text"/>
        </div>
      </header>
      <div>
        {tasks}
      </div>
    </div>
    )
  }
}

export default App;
