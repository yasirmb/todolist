import "./App.css";
import React, { useState, useEffect, Fragment } from "react";

function App() {
  const initailState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initailState);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deleted, setDelete] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isAc, setIsAc] = useState(false);
  const [err, setErr] = useState('')

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  let add = (e) => {
    e.preventDefault();
    if (todo.length === 0) {
      setErr('Required')
    } else {
      setErr('')
      setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
      setTodo("");
    }
    
  };
  const handleEditInputChange = (e) => {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };

  // function to handle when the "Edit" button is clicked
  function handleEditClick(element) {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentTodo({ ...element });
  }

  const handelDelete = ({ id, text, status }) => {
    console.log(id);
    setDelete([...deleted, { id: id, text: text, status: status }]);
    console.log();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // function to edit a todo item
  function handleUpdateTodo(id, updatedTodo) {
    if (updatedTodo.text.length === 0) {
      setErr('Required')
    } else {
      setErr('')
      // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
      // if the id's match, use the second parameter to pass in the updated todo object
      // otherwise just use old todo
      const updatedItem = todos.map((todo) => {
        return todo.id === id ? updatedTodo : todo;
      });
      // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
      setIsEditing(false);
      // update the todos state with the updated todo
      setTodos(updatedItem);
    }
    
  }


  function handleEditFormSubmit(e) {
    e.preventDefault();
      // call the handleUpdateTodo function - passing the currentTodo.id and the currentTodo object as arguments
      handleUpdateTodo(currentTodo.id, currentTodo);

  }

  const delteDeleted = ({ id, text, status }) => {
    setDelete(deleted.filter((hello) => hello.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, {new Date().toLocaleString("en-US", { month: "long" })} 🌝 ☕ </h2>
      </div>
      {isEditing ? (
        <Fragment>
        <div className="input">
          <input
            name="name"
            type="text"
            value={currentTodo.text}
            onChange={handleEditInputChange}
            placeholder="🖊 Add item..."
          />
          <i className="fas fa-plus" onClick={handleEditFormSubmit}></i>
        </div>
          <div style={{ color: "red" }}>{err ? err : ''}</div>
        </Fragment>
      ) : (
          <Fragment>
        <div className="input">
          <input
            name="name"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="🖊 Add item..."
          />
            <i className="fas fa-plus" onClick={add}></i>
            </div>
            <div style={{ color: "red" }}>{err ? err : ''}</div>
          </Fragment>
          
      )}
      {todos.map((element, i) => {
        return (
          <div className="todos " key={i}>
            <div className="todo" key={element.id}>
              <div className="left">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    setTodos(
                      todos.filter((elem2) => {
                        if (elem2.id === element.id) {
                          elem2.status = e.target.checked;
                        }
                        return elem2;
                      })
                    );
                  }}
                  value={element.status}
                />
                <p>{element.text}</p>
              </div>
              <div className="right">
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => handleEditClick(element)}
                ></i>
                <i
                  className="fas fa-times"
                  onClick={() => {
                    handelDelete(element);
                  }}
                ></i>
              </div>
            </div>
          </div>
        );
      })}
      <React.Fragment>
        <div className="accordion">
          <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsAc(!isAc)}>
              <div>Completed</div>
              <div>{isAc ? "-" : "+"}</div>
            </div>
            {todos.map((elem) => {
              if (elem.status) {
                return isAc && <div className="accordion-content">{elem.text}</div>;
              }
              return null;
            })}
          </div>
        </div>
      </React.Fragment>

      {/* delte */}
      <div className="remove">
        <React.Fragment>
          <div className="accordion">
            <div className="accordion-item">
              <div
                className="accordion-title"
                onClick={() => setIsActive(!isActive)}
              >
                <div>Removed</div>
                <div>{isActive ? "-" : "+"}</div>
              </div>
              {deleted.map((element, i) => {
                return (
                  isActive && (
                    <>
                      <div className="accordion-content">
                        {element.text}
                        <i
                          className="fa fa-times DeleteIcon"
                          onClick={() => {
                            delteDeleted(element);
                          }}
                        ></i>
                      </div>
                    </>
                  )
                );
              })}
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;