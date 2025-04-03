import { FaCheckCircle, FaClock, FaEdit, FaTrash } from "react-icons/fa";
import { Todo, TodoContext, TodoContextType } from "../context/TodoContext";
import { useContext, useState } from "react";
import UpdateTodoModal from "./UpdateTodo";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo, updateModal, setUpdateModal } = useContext(TodoContext) as TodoContextType;
   const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

   const handleEditClick = (id: string) => {
     setSelectedTodoId(id);
     setUpdateModal(true);
   };

  // Define priority colors
  const priorityColors: Record<string, string> = {
    low: "bg-green-600", // Green for low priority
    medium: "bg-yellow-500", // Yellow for medium priority
    high: "bg-red-500", // Red for high priority
  };

  return (
    <>
      <div
        key={todo._id}
        className="p-4 border border-gray-300 rounded shadow bg-white transition-all hover:scale-105"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <div className=" rounded-full flex gap-2">
            <FaEdit
              onClick={() => handleEditClick(todo._id)}
              className="text-blue-600 hover:text-blue-500 cursor-pointer"
              size={15}
            />
            <FaTrash
              onClick={() => deleteTodo(todo._id)}
              className="text-red-600 cursor-pointer"
              size={15}
            />
          </div>
        </div>

        <p className="text-sm text-gray-700 mt-1.5 truncate text-ellipsis whitespace-nowrap">
          {todo.description}
        </p>
        <p className="text-sm text-gray-600 mt-1.5">
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </p>

        <div className="flex justify-start items-center gap-2 mt-3">
          {/* Priority Badge with dynamic color */}
          <span
            className={`${
              priorityColors[todo.priority]
            } rounded-lg py-1 tracking-wide px-2 text-xs font-medium text-white`}
          >
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>

          {/* Completion Status */}
          <span
            className={`flex items-center gap-1 rounded-lg py-1 px-2 text-xs font-medium tracking-wide text-white 
        ${todo.completed ? "bg-green-600" : "bg-yellow-500"}`}
          >
            {todo.completed ? <FaCheckCircle /> : <FaClock />}
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      {updateModal && selectedTodoId && (
        <UpdateTodoModal
          todoId={selectedTodoId}
        />
      )}
    </>
  );
};
export default TodoItem;
