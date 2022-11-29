import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "src/api/todosApi";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: number;
  title: string;
};

export default function Form() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
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
    <div className="flex flex-col items-center justify-evenly">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 min-w-[500px]">
          <input
            {...register("id", { required: true, min: 100 })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput8"
            min={100}
            placeholder="ID"
          />
        </div>
        <div className="form-group mb-4 min-w-[500px]">
          <textarea
            {...register("title", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlTextarea13"
            rows={3}
            placeholder="Title"
          ></textarea>
          {errors.title && <p>There is error in text area</p>}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-orange-300 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-500 hover:shadow-lg focus:bg-orange-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-500 active:shadow-lg "
        >
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </form>
    </div>
  );
}
