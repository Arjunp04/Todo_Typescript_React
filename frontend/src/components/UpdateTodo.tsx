import { useState, useContext, useEffect } from "react";
import { Todo, TodoContext, TodoContextType } from "../context/TodoContext";
import axios from "axios";

interface UpdateTodoModalProps {
  todoId: string;
}

const UpdateTodoModal: React.FC<UpdateTodoModalProps> = ({ todoId }) => {
  const { updateTodo, setUpdateModal } = useContext(
    TodoContext
  ) as TodoContextType;

  const [singleTodo, setSingleTodo] = useState<Todo | null>(null);

  // Fetch the todo details based on todo._id
  useEffect(() => {
    if (todoId) {
      fetchTodoById();
    }
  }, [todoId]);

  const fetchTodoById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/todos/${todoId}`
      );
      console.log(response);
      setSingleTodo(response.data.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setSingleTodo((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "priority"
                ? value.toLowerCase()
                : name === "completed"
                ? value === "Completed"
                : value,
          }
        : null
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (singleTodo) {
      updateTodo(singleTodo);
      setUpdateModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[2px]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-md lg:w-xl mx-4">
        <h2 className="text-xl font-bold mb-4">Update Todo</h2>

        {singleTodo ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={singleTodo.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={singleTodo.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={
                  singleTodo.dueDate
                    ? new Date(singleTodo.dueDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block font-medium">Priority</label>
              <select
                name="priority"
                value={singleTodo.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status (Completed) */}
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="completed"
                value={singleTodo.completed ? "Completed" : "Pending"}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setUpdateModal(false)}
                className="bg-red-600 hover:bg-red-600/90 text-white px-3 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-600/90 text-white w-[74px] py-2 rounded cursor-pointer flex items-center justify-center"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateTodoModal;
