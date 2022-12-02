import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useSelectorTyped } from "src/example3/store/reduxHook";
import { selectAllUsers } from "../users/usersSlice";
import { IPost } from "../types";

export default function PostsExcerpt({ post }: { post: IPost }) {
  return (
    <article className="rounded block p-4 bg-[#343232] w-80 hover:bg-[#665a4d] text-white">
      <div className="grid grid-cols-2 text-sm">
        <Author userID={post.userId} />
        {post.date && <TimeAgo timestamp={post.date} />}
      </div>
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
    </article>
  );
}

export const Author = ({ userID }: { userID: string }) => {
  const users = useSelectorTyped(selectAllUsers);
  const author = users.find((user) => user.id === userID);
  return (
    <p className="italic">{`Author: ${
      author ? author.name : "Unknown author"
    }`}</p>
  );
};
