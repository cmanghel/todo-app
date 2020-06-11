/* eslint-disable */
import React from 'react';
import './App.scss';



interface ItemRowProps {
  value: ItemData;
  isEditing: boolean;
  toggleCompleted: () => void;
  startEdit: () => void;
  saveEdit: () => void;
  handleEdit: (value: string) => void;
  deleteItem: () => void;
}

interface ItemRowState {
}

class ItemRow extends React.Component<ItemRowProps, ItemRowState> {
  render() {
    if (this.props.isEditing) {
      return(
        <div>
          <input
            type="text"
            value={this.props.value.task}
            onChange={(e) => this.props.handleEdit}
            onBlur={this.props.saveEdit}
            />
        </div>
      )
    }
    else {
      return (
        <div>
          <input
            type="checkbox"
            checked={this.props.value.completed}
            onClick={this.props.toggleCompleted}
          />
          <span onDoubleClick={this.props.startEdit}>
            {this.props.value.task}
          </span>
          <button onClick={this.props.deleteItem}>X</button>
        </div>
      )
    }
  }
}


type ItemData = {
  task : string;
  completed: boolean;
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
        {task: "third task", completed: true},
      ],
      beingEdited: null,
    }
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this)
  }

  toggleCompleted(i: number): void {
    this.state.items[i].completed = !this.state.items[i].completed;
    this.setState({items: this.state.items});
  }

  startEdit(i: number): void {
    this.setState({beingEdited: i});
  }

  handleEdit(i: number, value: string) {
    this.state.items[i].task = value;
    this.setState({items: this.state.items});
  }

  saveEdit(i: number): void {
    this.setState({beingEdited: null});
  }

  deleteItem(i: number): void {
    const items = this.state.items.slice();
    items.splice(i, 1);
    this.setState({items, beingEdited: null});
  }

  renderTask(i: number): JSX.Element {
    return (
      <ItemRow
      value={this.state.items[i]}
      isEditing={this.state.beingEdited === i}
      toggleCompleted={() => this.toggleCompleted(i)}
      startEdit={() => this.startEdit(i)}
      handleEdit={(value) => this.handleEdit(i, value)}
      saveEdit={() => this.saveEdit(i)}
      deleteItem={() => this.deleteItem(i)}
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
