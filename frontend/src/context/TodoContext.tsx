import axios from "axios";
import { createContext, ReactNode, useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  loading: Boolean;
  openModal: Boolean;
  setOpenModal: (open: boolean) => void;
  updateModal: Boolean;
  setUpdateModal: (open: boolean) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [updateModal, setUpdateModal] = useState<Boolean>(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/todos`);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  const addTodo = async (todo: Todo) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/v1/todos/create`, todo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodos((prev) => [...prev, response.data.data]);
      fetchTodos();
    } catch (error) {
      setLoading(false);
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/v1/todos/${updatedTodo._id}`,
        updatedTodo
      );
      setTodos((prev) =>
        prev.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/v1/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: TodoContextType = {
    todos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    loading,
    openModal,
    setOpenModal,
    updateModal,
    setUpdateModal,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoProvider };
