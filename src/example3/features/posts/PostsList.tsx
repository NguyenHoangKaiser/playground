import { useSelectorTyped } from "src/example3/store/reduxHook";
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

export default function PostsList() {
  const posts = useSelectorTyped(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article
      className="rounded block p-4 bg-[#343232] w-80 hover:bg-[#665a4d] text-white"
      key={post.id}
    >
      <div className="grid grid-cols-2 text-sm">
        <Author userID={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
    </article>
  ));

  return (
    <section className="flex-container flex-col">
      <h2 className="text-lg font-semibold">Posts</h2>
      {renderedPosts}
    </section>
  );
}

const Author = ({ userID }: { userID: string }) => {
  const users = useSelectorTyped(selectAllUsers);
  const author = users.find((user) => user.id === userID);
  return (
    <p className="italic">{`Author: ${
      author ? author.name : "Unknown author"
    }`}</p>
  );
};
