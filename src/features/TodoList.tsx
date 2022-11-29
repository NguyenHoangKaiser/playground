import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, deleteTodo, updateTodo } from "src/api/todosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { startTransition, useState } from "react";

interface Props {}

function TodoList({}: Props) {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    select(data) {
      return data.sort((a, b) => b.id - a.id);
    },
  });
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // function that generate unique id
  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodoMutation.mutate({
      userId: 1,
      id: generateId(),
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  const newItemSection = (
    <form
      className="bg-gray-100 border-solid border border-black flex items-center justify-between p-4"
      onSubmit={handleSubmit}
    >
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="pr-8 w-full">
        <input
          type="text"
          className="border-solid border-0 p-2 w-full border-black rounded-lg"
          id="new-todo"
          value={newTodo}
          onChange={(e) => {
            startTransition(() => {
              setNewTodo(e.target.value);
            });
          }}
          placeholder="Enter new todo"
        />
      </div>
      <button className="text-gray-500 hover:text-[#fcb66b]">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError && error instanceof Error) {
    content = <p>{error.message}</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article
          className="bg-gray-100 border-solid border border-black flex items-center justify-between p-4"
          key={todo.id}
        >
          <div className="flex justify-start items-center">
            <input
              type="checkbox"
              className="mr-4 min-h-[30px] min-w-[30px]"
              checked={todo.completed}
              id={todo.id.toString()}
              onChange={() =>
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
            />
            <label htmlFor={todo.id.toString()}>{todo.title}</label>
          </div>
          <button
            className="border-solid border cursor-pointer bg-gray-100 text-[#ef4444] border-black rounded-[10%] min-h-[50px] min-w-[50px] hover:bg-[#fcb66b]"
            onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  return (
    <main className="text-2xl text-black bg-gray-100 m-auto py-4 px-8 max-w-[600px] rounded-2xl shadow-[2px_2px_5px_rgb(51,51,51)]">
      <h1 className="mx-0 my-2">Todo Lists</h1>
      {newItemSection}
      {content}
    </main>
  );
}

export default TodoList;
