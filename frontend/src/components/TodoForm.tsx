import { useState, useContext } from "react";
import { Todo, TodoContext, TodoContextType } from "../context/TodoContext";
import { BiLoader } from "react-icons/bi";

interface TodoFormProps {
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onClose }) => {
  const { addTodo, loading } = useContext(TodoContext) as TodoContextType;

  const [todoForm, setTodoForm] = useState<Todo>({
    _id:"id123",
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    completed: false, // Default as false (Pending)
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setTodoForm((prev) => ({
      ...prev,
      [name]:
        name === "priority"
          ? value.toLowerCase()
          : name === "completed"
          ? value === "Completed"
          : value, // Convert to boolean,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(todoForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[2px]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-md lg:w-xl mx-4">
        <h2 className="text-xl font-bold mb-4">Create Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={todoForm.title}
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
              value={todoForm.description}
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
              value={todoForm.dueDate}
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
              value={todoForm.priority}
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
              value={todoForm.completed ? "Completed" : "Pending"}
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
              onClick={onClose}
              className="bg-red-600 hover:bg-red-600/90 text-white px-3 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-600/90 text-white w-[74px] py-2 rounded cursor-pointer flex items-center justify-center"
            >
              {loading ? <BiLoader /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
