import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatchTyped, useSelectorTyped } from "../../store/reduxHook";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

type Inputs = {
  title: string;
  content: string;
  userId: string;
};

export default function AddPostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatchTyped();
  const user = useSelectorTyped(selectAllUsers);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(
      postAdded({
        title: data.title,
        content: data.content,
        userId: data.userId,
      })
    );
    reset();
  };

  return (
    <form
      className="w-full max-w-lg m-auto py-10 mt-10 px-10 border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="my-2">
        <label htmlFor="title" className="text-white font-medium">
          Post title
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

      <div className="my-2">
        <label htmlFor="content" className="text-white font-medium">
          Post content
        </label>
        <input
          type="text"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
          placeholder="Content"
          {...register("content", {
            required: "Please enter a content",
            minLength: {
              value: 5,
              message: "content must be at least 5 characters",
            },
            maxLength: {
              value: 20,
              message: "content must be less than 20 characters",
            },
          })}
        />
        {errors.content && (
          <div className="mb-3 text-normal text-red-500">
            {errors.content.message}
          </div>
        )}
      </div>

      <div className="my-2">
        <label htmlFor="userId" className="text-white font-medium">
          Post userId
        </label>
        <select
          {...register("userId", { required: true })}
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
        >
          {user.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.userId && (
          <div className="mb-3 text-normal text-red-500">
            {errors.userId.message}
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
