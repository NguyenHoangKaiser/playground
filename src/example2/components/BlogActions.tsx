import { Link } from "react-router-dom";

function BlogActions() {
  return (
    <div className="flex justify-center my-8 mx-auto max-w-[30rem]">
      <Link
        className="rounded py-2 px-6 no-underline bg-[#e5e5e5] text-[#343232] hover:bg-[#f9d3a9]"
        to="/blog/new"
      >
        Add Post
      </Link>
    </div>
  );
}

export default BlogActions;
