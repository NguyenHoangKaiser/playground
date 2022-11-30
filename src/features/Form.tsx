import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "src/api/todosApi";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: number;
  title: string;
  email: string;
  password: string;
};

export default function Form() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    addTodoMutation.mutate({
      userId: 1,
      id: data.id,
      title: data.title,
      completed: false,
    });
    reset();
  };

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <form
      className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="id" className="text-gray-600 font-medium">
          Todo ID
        </label>
        <input
          type="number"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          placeholder="ID"
          // min={1}
          {...register("id", {
            required: "Please enter an ID",
            min: {
              value: 1,
              message: "ID must be greater than 0",
            },
          })}
        />
        {errors.id && (
          <div className="mb-3 text-normal text-red-500">
            {errors.id.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="title" className="text-gray-600 font-medium">
          Todo title
        </label>
        <input
          type="text"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          placeholder="Title"
          autoFocus
          {...register("title", {
            required: "Please enter a title",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
            maxLength: {
              value: 20,
              message: "Title must be less than 20 characters",
            },
          })}
        />
        {errors.title && (
          <div className="mb-3 text-normal text-red-500">
            {errors.title.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-gray-600 font-medium">
          Todo email
        </label>
        <input
          type="text"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          placeholder="email"
          {...register("email", {
            required: "Please enter an email address",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        {errors.email && (
          <div className="mb-3 text-normal text-red-500">
            {errors.email.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-gray-600 font-medium">
          Todo password
        </label>
        <input
          type="password"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          placeholder="password"
          {...register("password", {
            required: "Please enter a password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <div className="mb-3 text-normal text-red-500">
            {errors.password.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-orange-300 hover:bg-orange-500 text-gray-600 border shadow py-3 px-6 font-semibold text-md rounded"
      >
        Submit
      </button>
    </form>
  );
}
