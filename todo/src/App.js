/* eslint-disable jsx-a11y/no-redundant-roles */
import logo from "./logo.svg";
import "./App.css";
import Todo from "./Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  function addTask(task) {
    const newTask = { id: `todo-${nanoid()}`, name: task, completed: false };
    setTask([...tasks, newTask]);
  }
  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      key={task.id}
      name={task.name}
      completed={task.completed}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <FilterButton />
      <FilterButton />
      <FilterButton />
      <h2 id="list-heading">{headingText}</h2>
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
