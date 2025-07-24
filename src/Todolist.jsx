import React, { useEffect, useState } from "react";
import "./todoList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Todolist() {
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [todo, setTodo] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    estimation: "",
    description: "",
  });
  console.log("todo:", todo);

  const handleAdd = () => {
    if (!details.title || !details.estimation || !details.description) {
      return alert("Please Fill All The Field");
    }
    if (currentEditIndex !== null) {
      const updatetodo = [...todo]
      updatetodo[currentEditIndex]= details
      setTodo(updatetodo)
    } else {
      setDetails({ title: "", estimation: "", description: "" });
      setTodo([...todo, details]);
      localStorage.setItem("list", JSON.stringify([...todo, details]));
    }
  };

  const editBtn = (id) => {
    const found = todo.find((item, index) => index == id);
    setDetails(found);
    setCurrentEditIndex(id);
  };

  const deleteBtn = (id) => {
    const filtered = todo.filter((item, index) => index !== id);
    setTodo(filtered);
    localStorage.setItem("list", JSON.stringify(filtered));
  };

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("list")) || []);
  }, []);

  return (
    <>
      <div className="container">
        <h2>ADD TODO</h2>

        <div className="inputs">
          <input
            type="text"
            placeholder="Title"
            value={details.title}
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Estimation(hrs)"
            value={details.estimation}
            onChange={(e) =>
              setDetails({ ...details, estimation: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={details.description}
            onChange={(e) =>
              setDetails({ ...details, description: e.target.value })
            }
          />
        </div>
        <div className="btn">
          <button className="addBtn" onClick={handleAdd}>
            ADD
          </button>
        </div>
        <h2 className="bottom">TODO LIST</h2>
        <div className="data">
          {todo.map((item, index) => (
            <div className="result" key={index}>
              <p>
                {item.title}-{item.description} ({item.estimation} hrs)
              </p>
              <div className="btn-grp">
                <button className="editBtn" onClick={() => editBtn(index)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="deleteBtn" onClick={() => deleteBtn(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Todolist;
