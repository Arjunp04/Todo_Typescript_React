import { useContext} from "react";
import { TodoContext, TodoContextType } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const TodoList: React.FC = () => {
  const { todos,openModal,setOpenModal } = useContext(TodoContext) as TodoContextType;

  return (
    <div className="py-6 space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">All Todos</h2>
        <button
          className="bg-blue-600 px-3 py-2 text-white font-medium rounded-md cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          + Create Todo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {todos?.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </div>

      {openModal && <TodoForm onClose={() => setOpenModal(false)} />}

    
    </div>
  );
};

export default TodoList;
