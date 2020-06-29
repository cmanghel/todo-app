/* eslint-disable */
import React from 'react';
import './App.scss';
import Pluralize from 'pluralize';

interface InputRowProps {
  allCompleted: boolean;
  emptyList: boolean;
  taskToAdd: string;
  toggleAllCompleted: () => void;
  handleInput: (value: string) => void;
  saveInput: () => void;
}

function InputRow(props: InputRowProps): JSX.Element {

  const handleSubmit = (e: any) => {
     e.preventDefault();
     props.saveInput();
   }

  return props.emptyList ? (
    <div>
      <form onSubmit={handleSubmit}>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input
          autoFocus
          type="text"
          placeholder="Add a new task"
          onChange={(e) => props.handleInput(e.target.value)}
          value={props.taskToAdd}
        />
      </form>
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={props.allCompleted}
          onClick={props.toggleAllCompleted}
        />
        <input
          type="text"
          placeholder="Add a new task"
          onChange={(e) => props.handleInput(e.target.value)}
          value={props.taskToAdd}
        />
      </form>
    </div>
  )
}

interface ItemRowProps {
  value: ItemData;
  isEditing: boolean;
  toggleCompleted: () => void;
  startEdit: () => void;
  saveEdit: () => void;
  handleEdit: (value: string) => void;
  deleteItem: () => void;
}

function ItemRow(props: ItemRowProps): JSX.Element {
  if (props.isEditing) {
    return(
      <div>
        <form onSubmit={props.saveEdit}>
          <input
            autoFocus
            type="text"
            value={props.value.task}
            onChange={(e) => props.handleEdit(e.target.value)}
            onBlur={props.saveEdit}
          />
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <input
          type="checkbox"
          checked={props.value.completed}
          onClick={props.toggleCompleted}
        />
        <span onDoubleClick={props.startEdit}>
          {props.value.task}
        </span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <button onClick={props.deleteItem}>X</button>
      </div>
    )
  }
}

interface OptionsRowProps {
  itemsLeft: number;
  viewOption: ViewType;
  emptyList: boolean;
  handleChangeView: (value: ViewType) => void;
  clearCompleted: () => void;
}

function OptionsRow(props: OptionsRowProps): JSX.Element | null {
  const views: ViewType[] = ["All", "Active", "Completed"];

  const buttons = views.map(view =>
  <label>
    <input
      type="radio"
      name="view"
      value={view}
      checked={props.viewOption === view}
      onChange={(e) => props.handleChangeView(view)}
      />
    {view}
  </label>
  );

  return !props.emptyList ? (
    <div>
      <span>{Pluralize('item', props.itemsLeft, true)} left</span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      {buttons}
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <button onClick={props.clearCompleted}>Clear completed</button>
    </div>
  ) : (
    null
    )
}


type ItemData = {
  task : string;
  completed: boolean;
}

type ViewType = "All" | "Active" | "Completed"

interface AppProps {
}

interface AppState {
  items: ItemData[];
  beingEdited: number | null;
  taskToAdd: string;
  viewOption: ViewType;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      items:[{task: "foo bar", completed: false}],
      beingEdited: null,
      taskToAdd: "",
      viewOption: "All"
    }
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.toggleAllCompleted = this.toggleAllCompleted.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.allCompleted = this.allCompleted.bind(this);
    this.saveInput = this.saveInput.bind(this);
    this.itemsLeft = this.itemsLeft.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  toggleCompleted(i: number): void {
    this.state.items[i].completed = !this.state.items[i].completed;
    this.setState({items: this.state.items});
  }

  allCompleted(): boolean {
    return this.state.items.every((item: ItemData) => item.completed);
  }

  toggleAllCompleted(): void {
    if (!this.allCompleted()) {
      this.state.items.forEach(item => {item.completed = true})
      this.setState({items: this.state.items})
    }
    else {
      this.state.items.forEach(item => {item.completed = !item.completed})
      this.setState({items: this.state.items})
    }
  }

  startEdit(i: number): void {
    this.setState({beingEdited: i});
  }

  handleEdit(i: number, value: string): void {
    this.state.items[i].task = value;
    this.setState({items: this.state.items});
  }

  saveEdit(i: number): void {
    this.setState({beingEdited: null});
  }

  deleteItem(i: number): void {
    const items = this.state.items.slice();
    items.splice(i, 1);
    this.setState({items});
  }

  handleInput(value: string): void {
    this.setState({taskToAdd: value});
  }

  saveInput(): void {
    if (!this.state.taskToAdd) return;
    this.setState({
      items: this.state.items.concat({task: this.state.taskToAdd, completed: false}),
      taskToAdd: ""
    });
  }

  itemsLeft(): number {
    return this.state.items.filter(item => !item.completed).length
  }

  clearCompleted(): void {
    this.setState({items: this.state.items.filter(item => !item.completed)})
  }

  changeViewTo(value: ViewType): void {
    this.setState({viewOption: value})
  }

  renderTask(i: number): JSX.Element | null {
    const row: JSX.Element = <ItemRow
      value={this.state.items[i]}
      isEditing={this.state.beingEdited === i}
      toggleCompleted={() => this.toggleCompleted(i)}
      startEdit={() => this.startEdit(i)}
      handleEdit={(value) => this.handleEdit(i, value)}
      saveEdit={() => this.saveEdit(i)}
      deleteItem={() => this.deleteItem(i)}
      />
      switch (this.state.viewOption) {
        case "All":
          return row;
          break;
        case "Active":
          return this.state.items[i].completed ? null : row;
          break;
        case "Completed":
          return this.state.items[i].completed ? row : null;
          break;
        }
      }

  render(): JSX.Element {
    const tasks = this.state.items.map((item, i) => this.renderTask(i));
    return (
    <div className="App">
      <header className="App-header">
        <InputRow
          allCompleted={this.allCompleted()}
          toggleAllCompleted={this.toggleAllCompleted}
          saveInput={() => this.saveInput()}
          emptyList={this.state.items.length === 0}
          taskToAdd={this.state.taskToAdd}
          handleInput={(value) => this.handleInput(value)}
        />
      </header>
      <div>
        {tasks}
      </div>
      <div>
        <OptionsRow
          itemsLeft={this.itemsLeft()}
          viewOption={this.state.viewOption}
          emptyList={this.state.items.length === 0}
          clearCompleted={this.clearCompleted}
          handleChangeView={(value) => this.changeViewTo(value)}
        />
      </div>
    </div>
    )
  }
}

export default App;
