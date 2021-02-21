/* eslint-disable jsx-a11y/no-redundant-roles */
import logo from "./logo.svg";
import "./App.css";
import Todo from "./Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

const Filter_Map = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const Filter_Names = Object.keys(Filter_Map);

function App(props) {
  const [tasks, setTask] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  function addTask(task) {
    const newTask = { id: `todo-${nanoid()}`, name: task, completed: false };
    setTask([...tasks, newTask]);
  }

  function toggleCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // use object spread syntax to make a new object
        //whos Completed prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTask(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTask(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      //if this task has the same id as the edited task
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTask(editedTaskList);
  }
  const taskList = tasks
    .filter(Filter_Map[filter])
    .map((task) => (
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        completed={task.Completed}
        toggleCompleted={toggleCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const filterList = Filter_Names.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      {filterList}
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
