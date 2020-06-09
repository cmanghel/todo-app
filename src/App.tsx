import React from 'react';
import './App.scss';

type ItemData = {
  task : string;
  completed: boolean;

}

interface ItemRowProps {
  value: ItemData;
  toggleCompleted: () => void;
  startEdit: () => void;
}

interface ItemRowState {
}

class ItemRow extends React.Component<ItemRowProps, ItemRowState> {
  render() {
    return (
      <div>
        <input 
          type="checkbox" 
          checked={this.props.value.completed} 
          onClick={this.props.toggleCompleted}
        />
        <button onDoubleClick={this.props.startEdit}>
          {this.props.value.task}
        </button>
      </div>
    )
  }
}

interface AppProps {
}
interface AppState {
  items: ItemData[];
  beingEdited: number | null;
}



class App extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props);
    this.state = {
      items:[
        {task: "some shit to do", completed: true}, 
        {task: "finish this app", completed: false},
      ],
      beingEdited: null,
    }
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }

  toggleCompleted(i: number): void {
    this.state.items[i].completed = !this.state.items[i].completed;
    this.setState({items: this.state.items});
  }

  startEdit(i: number): void {
    this.setState({beingEdited: i});
  }
  
  renderTask(i: number): JSX.Element {
    return (
      <ItemRow 
      value={this.state.items[i]}
      toggleCompleted={() => this.toggleCompleted(i)}
      startEdit={() => this.startEdit(i)}
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
