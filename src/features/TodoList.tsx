import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, deleteTodo, updateTodo } from "src/api/todosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

function TodoList() {
  const queryClient = useQueryClient();
  console.log("render TodoList");

  const {
    data: todos,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    // select(data) {
    //   return data.sort((a, b) => b.id - a.id);
    // },
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
            <label
              htmlFor={todo.id.toString()}
            >{`ID${todo.id}: ${todo.title}`}</label>
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
      <Form />
      <div className="mt-4">{content}</div>
    </main>
  );
}

export default TodoList;
