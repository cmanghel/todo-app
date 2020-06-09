import React from 'react';
import './App.scss';

type ItemData = {
  task : string;
  completed: boolean;
}

interface ItemRowProps {
  key: number;
  isEdited: boolean;
}

interface ItemRowState {
  value: ItemData;
}

class ItemRow extends React.Component<ItemRowProps, ItemRowState> {
  constructor(props: ItemRowProps) {
    super(props);
    this.state = {
      value: {task: '', completed: false}
    }
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }
  render() {
    return (
      <div>
        <input 
          type="checkbox" 
          checked={this.state.value.completed} 
          onClick={this.toggleCompleted}
        />
        <button >{this.state.value.task}</button>
      </div>
    )
  }

  toggleCompleted(): void {
    this.state.value.completed = !this.state.value.completed;
    this.setState({value: this.state.value});
  }


}

interface AppProps {
}
interface AppState {
  items: boolean[]
}





class App extends React.Component<AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props);
    this.state = {
      items:[]
    }
    this.renderTask = this.renderTask.bind(this);
  }

  renderTask(i: number): JSX.Element {
    return (
      <ItemRow 
      key={i}
      isEdited={this.state.items[i]}
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
