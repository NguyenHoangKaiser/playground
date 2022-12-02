import Counter from "./features/counter/Counter";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

export default function ReduxPage() {
  return (
    <>
      <h2 className="text-center">ReduxPage</h2>
      <div className="grid grid-cols-2">
        <AddPostForm />
        <PostsList />
      </div>
      {/* <Counter /> */}
    </>
  );
}
