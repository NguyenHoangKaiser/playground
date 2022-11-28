import { Form } from "react-router-dom";

interface INewPostFormProps {
  onCancel: () => void;
  submitting: boolean;
}

function NewPostForm({ onCancel, submitting }: INewPostFormProps) {
  return (
    <Form className="max-w-xs mx-auto my-8" action="/blog/new" method="post">
      <fieldset className="mx-0 my-2">
        <label className="block mb-2 font-bold" htmlFor="title">
          Title
        </label>
        <input
          className="block w-full p-2 text-black rounded"
          id="title"
          type="text"
          name="title"
          required
          minLength={5}
        />
      </fieldset>
      <fieldset>
        <label
          className="block w-full p-2 mb-2 font-bold rounded"
          htmlFor="text"
        >
          Post Text
        </label>
        <textarea
          id="text"
          name="post-text"
          className="block w-full p-2 text-black rounded"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <div className="flex items-center gap-4 mt-3 justify-evenly">
        <button
          className={`px-6 py-2 rounded  ${
            submitting
              ? "text-[#515151] bg-transparent "
              : "text-[#c7c4c4] hover:text-[#fcb66b] cursor-pointer bg-[#515151]"
          }`}
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          className={`px-6 py-2 rounded  ${
            submitting
              ? "text-[#3a3a3a] bg-[#a2a1a1] "
              : "text-black hover:bg-[#fcb66b] cursor-pointer bg-blue-400"
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Create Post"}
        </button>
      </div>
    </Form>
  );
}

export default NewPostForm;
