import { useLoaderData } from "react-router-dom";
import Posts from "../components/Posts";
import { getPosts } from "../util/api";
import { TQueryClient } from "../App3";
import { useQuery } from "@tanstack/react-query";

const customQuery = () => ({
  queryKey: ["blogPosts"],
  queryFn: getPosts,
});

function BlogPostsPage() {
  // const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useQuery(customQuery());

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={data} />
    </>
  );
}

export const loader = (queryClient: TQueryClient) => {
  return async () => {
    const query = customQuery();
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
};

export default BlogPostsPage;

// export function loader(queryClient: TQueryClient) {
//   // return (
//   //   queryClient.getQueryData(["blogPosts"]) ||
//   //   (await queryClient.fetchQuery({
//   //     queryKey: ["blogPosts"],
//   //     queryFn: getPosts,
//   //   }))
//   // );
//   // const preFetchData = (await queryClient.getQueryData(["blogPosts"])) as
//   //   | TPostResponse
//   //   | undefined;
//   // if (preFetchData) {
//   //   return preFetchData;
//   // } else {
//   //   return await queryClient.fetchQuery({
//   //     queryKey: ["blogPosts"],
//   //     queryFn: getPosts,
//   //   });
//   // }
//   return async () =>
//     queryClient.fetchQuery({
//       queryKey: ["blogPosts"],
//       queryFn: getPosts,
//       staleTime: 1000 * 60 * 2,
//     });
//   // return async () => {
//   //   const data = await queryClient.getQueryData(customQuery().queryKey);
//   //   if (data) return data;
//   //   return queryClient.fetchQuery(customQuery());
//   // };
// }
