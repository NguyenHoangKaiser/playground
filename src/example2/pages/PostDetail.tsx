import { useLoaderData, useParams } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import NewsletterSignup from "../components/NewsletterSignup";
import { getPost, IPostData } from "../util/api";
import { useQuery } from "@tanstack/react-query";
import { TQueryClient } from "../App3";

const customQuery = (postId: string) => ({
  queryKey: ["blogPostDetail"],
  queryFn: async () => {
    const data = await getPost(postId);
    if (data) {
      return data;
    } else {
      throw new Error("Post not found");
    }
  },
});

function PostDetailPage() {
  // const postData = useLoaderData() as IPostData;
  const params = useParams();
  const { data: postData } = useQuery(customQuery(params.id as string));

  return (
    <>
      {postData ? (
        <BlogPost title={postData.title} text={postData.body} />
      ) : (
        <p className="text-center">Got no post data</p>
      )}
      <NewsletterSignup />
    </>
  );
}

export const loader =
  (queryClient: TQueryClient) =>
  async ({ params }: any) => {
    if (params.id) {
      const query = customQuery(params.id);
      return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
      );
    } else {
      throw new Error("No post id provided");
    }
  };

export default PostDetailPage;

// export function loader({ params }: any) {
//   const postId = params.id;

//   return getPost(postId);
// }
