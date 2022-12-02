import { useSelectorTyped } from "src/example3/store/reduxHook";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

import { useDispatchTyped } from "src/example3/store/reduxHook";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

export default function PostsList() {
  const dispatch = useDispatchTyped();
  const posts = useSelectorTyped(selectAllPosts);
  const postStatus = useSelectorTyped(getPostsStatus);
  const error = useSelectorTyped(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="flex-container flex-col">
      <h2 className="text-lg font-semibold">Posts</h2>
      {content}
    </section>
  );
}
