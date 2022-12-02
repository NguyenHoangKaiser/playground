import { useSelectorTyped } from "src/example3/store/reduxHook";
import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

export default function PostsList() {
  const posts = useSelectorTyped(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <article
      className="rounded block p-4 bg-[#343232] w-80 hover:bg-[#665a4d] text-white"
      key={post.id}
    >
      <Author userID={post.userId} />
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      {/* <button className="button">View Post</button> */}
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
    <p className="text-sm italic">{`Author: ${
      author ? author.name : "Unknown author"
    }`}</p>
  );
};
