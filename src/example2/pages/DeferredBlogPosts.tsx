import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";

import Posts from "../components/Posts";
import { getSlowPosts, IPostData } from "../util/api";

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData() as { posts: IPostData[] };

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <Await
          resolve={loaderData.posts}
          errorElement={
            <p className="text-center">Error loading blog posts.</p>
          }
        >
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader() {
  return defer({ posts: getSlowPosts() });
}
