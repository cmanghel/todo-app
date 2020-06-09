import React from 'react';
import './App.scss';

type ItemData = {
  task : string;
  completed: boolean;
}

interface ItemRowProps {
  value: ItemData;
  toggleCompleted: () => void;
}

function ItemRow(props: ItemRowProps): JSX.Element {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={props.value.completed} 
        onClick={props.toggleCompleted}
      />
      <button >{props.value.task}</button>
    </div>
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
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.renderTask = this.renderTask.bind(this);
  }

  toggleCompleted(i: number): void {
    this.state.items[i].completed = !this.state.items[i].completed;
    this.setState({items: this.state.items});
  }
  
  renderTask(i: number): JSX.Element {
    return (
      <ItemRow 
      value={this.state.items[i]}
      toggleCompleted={() => this.toggleCompleted(i)}
      />
    )
  }

  render(): JSX.Element {
    const tasks = this.state.items.map((item, i) => this.renderTask(i));
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
