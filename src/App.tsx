import React from 'react';
import './App.scss';
//import _ from "lodash";

type ItemData = {
  task : string;
  completed: boolean;
}

interface ItemRowProps {
  value: ItemData;
  onClick: () => void;
}
//eslint-disable-next-line
function ItemRow(props: ItemRowProps): JSX.Element {
  return (
    <p>{props.value.task}</p>
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

  renderTask(item: ItemData): JSX.Element {
    return (
      <div>
        {item.task}
      </div>
    )
  }

  render(): JSX.Element {
    const tasks = this.state.items.map((item) => this.renderTask(item));
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
