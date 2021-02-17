import logo from "./logo.svg";
import "./App.css";
import Todo from "./Todo";
import Form from "../components/Form";
import FilterButton from "../components/FilterButton";

function App(props) {
  const taskList = props.tasks.map((task) => (
    <Todo
      id={task.id}
      key={task.id}
      name={task.name}
      completed={task.completed}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <FilterButton />
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      ></ul>
      {taskList}
    </div>
  );
}

export default App;
