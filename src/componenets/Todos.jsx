// import React, { useState } from "react";
// import {
//   useAddTodoMutation,
//   useDeleteTodoMutation,
//   useGetTodosQuery,
//   useUpdateTodoMutation,
// } from "../api/api";
// import Loader from "./Loader";
// import moment from "moment";
// import { useSelector } from "react-redux";

// const Todos = () => {
//   const [todoId, setTodoId] = useState("");
//   const [updateTodoId, setUpdateTodoId] = useState("");
//   const [deleteTodoId, setDeleteTodoId] = useState("");
//   const [todoText, setTodoText] = useState("");
//   const [updateText, setUpdateText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data } = useGetTodosQuery(currentPage);
//   const [addTodo, todoResponse] = useAddTodoMutation();
//   const [updateTodo, updateResponse] = useUpdateTodoMutation();
//   const [deleteTodo] = useDeleteTodoMutation();

//   function handleAddTodo(e) {
//     e.preventDefault();
//     if (todoText.length > 0) {
//       addTodo({ text: todoText }).then(() => setTodoText(""));
//     }
//   }

//   const toggleComplete = (id, value) => {
//     updateTodo({ id, data: { isCompleted: value } });
//   };

//   const handleUpdate = (id) => {
//     updateTodo({ id, data: { text: updateText } });
//     setUpdateTodoId("");
//   };

//   const handleDelete = (id) => {
//     deleteTodo(id);
//     setDeleteTodoId("");
//   };

//   return (
//     <div className="card">
//       <div className="card-header bg-primary text-white">
//         <h3 className="card-title">
//           <i className="ion ion-clipboard mr-1" />
//           To Do List
//         </h3>
//       </div>
//       <div className="card-body">
//         <ul className="todo-list" data-widget="todo-list">
//           {data?.todos?.map((todo) => (
//             <li key={todo._id}>
//               <div className="d-flex align-items-center">
//                 <div className="mr-3">
//                   {updateTodoId === todo._id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       style={{ width: "100%" }}
//                       value={updateText}
//                       onChange={(e) => setUpdateText(e.target.value)}
//                     />
//                   ) : (
//                     <input
//                       type="checkbox"
//                       checked={todo.isCompleted}
//                       onChange={(e) => {
//                         setTodoId(todo._id);
//                         toggleComplete(todo._id, e.target.checked);
//                       }}
//                     />
//                   )}
//                 </div>
//                 <div className="flex-grow-1">
//                   <span
//                     className="text"
//                     style={{
//                       textDecoration: todo.isCompleted && "line-through",
//                     }}
//                   >
//                     {todo.text}
//                   </span>
//                   <small className="badge badge-info ml-2">
//                     <i className="far fa-clock" />{" "}
//                     {moment(todo.createdAt).fromNow()}
//                   </small>
//                 </div>
//                 <div className="ml-auto">
//                   {updateTodoId === todo._id ? (
//                     <button
//                       className="btn btn-sm btn-primary mr-2"
//                       onClick={() => handleUpdate(todo._id)}
//                     >
//                       Update
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         className="btn btn-sm btn-info mr-2"
//                         onClick={() => {
//                           setUpdateText(todo.text);
//                           setUpdateTodoId(todo._id);
//                         }}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => setDeleteTodoId(todo._id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//               {deleteTodoId === todo._id && (
//                 <div className="mt-2">
//                   <span className="bg-danger text-white p-2 rounded">
//                     Are you sure you want to delete?
//                   </span>
//                   <button
//                     className="btn btn-sm btn-success ml-2"
//                     onClick={() => handleDelete(todo._id)}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     className="btn btn-sm btn-secondary ml-2"
//                     onClick={() => setDeleteTodoId("")}
//                   >
//                     No
//                   </button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="card-footer">
//         <form onSubmit={handleAddTodo} className="d-flex align-items-center">
//           <div className="flex-grow-1">
//             <input
//               type="text"
//               placeholder="Write something..."
//               className="form-control"
//               value={todoText}
//               onChange={(e) => setTodoText(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary ml-2">
//             Add Todo
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Todos;

import React, { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../api/api";
import Loader from "./Loader";
import moment from "moment";
import { useSelector } from "react-redux";

const Todos = () => {
  const [todoId, setTodoId] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState("");
  const [deleteTodoId, setDeleteTodoId] = useState("");
  const [todoText, setTodoText] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetTodosQuery(currentPage);
  const [addTodo, todoResponse] = useAddTodoMutation();
  const [updateTodo, updateResponse] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  function handleAddTodo(e) {
    e.preventDefault();
    if (todoText.length > 0) {
      addTodo({ text: todoText }).then(() => setTodoText(""));
    }
  }

  const toggleComplete = (id, value) => {
    updateTodo({ id, data: { isCompleted: value } });
  };

  const handleUpdate = (id) => {
    updateTodo({ id, data: { text: updateText } });
    setUpdateTodoId("");
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    setDeleteTodoId("");
  };

  const totalPages = data?.pages || 1;

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3 className="card-title">
          <i className="ion ion-clipboard mr-1" />
          To Do List
        </h3>
      </div>
      <div className="card-body">
        <ul className="todo-list" data-widget="todo-list">
          {data?.todos?.map((todo) => (
            <li key={todo._id}>
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) => {
                      setTodoId(todo._id);
                      toggleComplete(todo._id, e.target.checked);
                    }}
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <div className="flex-grow-1">
                  <span
                    className="text"
                    style={{
                      textDecoration: todo.isCompleted && "line-through",
                      fontSize: "16px", // Decrease font size
                    }}
                  >
                    {todo.text}
                  </span>
                  <small className="badge badge-info ml-2" style={{ fontSize: "10px", backgroundColor: "#17a2b8", padding: "4px 8px", borderRadius: "4px" }}>
                    <i className="far fa-clock" />{" "}
                    {moment(todo.createdAt).fromNow()}
                  </small>
                </div>
                <div className="ml-auto">
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => {
                      setUpdateText(todo.text);
                      setUpdateTodoId(todo._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setDeleteTodoId(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {updateTodoId === todo._id && (
                <div className="mt-2">
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "100%" }}
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => handleUpdate(todo._id)}
                  >
                    Update
                  </button>
                </div>
              )}
              {deleteTodoId === todo._id && (
                <div className="mt-2">
                  <span className="bg-danger text-white p-2 rounded">
                    Are you sure you want to delete?
                  </span>
                  <button
                    className="btn btn-sm btn-success ml-2"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-sm btn-secondary ml-2"
                    onClick={() => setDeleteTodoId("")}
                  >
                    No
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        <form onSubmit={handleAddTodo} className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              placeholder="Write something..."
              className="form-control"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary ml-2">
            Add Todo
          </button>
        </form>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center mt-3">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page && "active"}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Todos;
