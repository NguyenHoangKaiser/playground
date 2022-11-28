import { useLoaderData } from "react-router-dom";
import Posts from "../components/Posts";
import { getPosts, TPostResponse } from "../util/api";

function BlogPostsPage() {
  const loaderData = useLoaderData() as TPostResponse;

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loaderData} />
    </>
  );
}

export default BlogPostsPage;

export async function loader() {
  return getPosts();
}
