import axios from "axios";

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await todosApi.get("/todos");
  return response.data;
};

export const addTodo = async (todo: ITodo) => {
  return await todosApi.post("/todos", todo);
};

export const updateTodo = async (todo: ITodo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};

export const deleteTodo = async ({ id }: { id: number }) => {
  return await todosApi.delete(`/todos/${id}`);
};

export default todosApi;
