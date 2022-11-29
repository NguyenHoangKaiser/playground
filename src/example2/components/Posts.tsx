import { Link } from "react-router-dom";
import { TPostResponse } from "../util/api";

function Posts({ blogPosts }: { blogPosts: TPostResponse | undefined }) {
  return (
    <ul className="flex flex-col max-w-2xl gap-6 mx-auto my-8">
      {blogPosts?.map((post) => (
        <li key={post.id}>
          <Link
            className="rounded block p-4 no-underline bg-[#343232] hover:bg-[#665a4d] text-white"
            to={post.id.toString()}
          >
            <h2 className="text-lg font-normal capitalize">{post.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
