import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
import DeferredBlogPostsPage, {
  loader as deferredBlogPostsLoader,
} from "./pages/DeferredBlogPosts";
import ErrorPage from "./pages/Error";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import { action as newsletterAction } from "./pages/Newsletter";
import PostDetailPage, {
  loader as blogPostDetailLoader,
} from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
});

export type TQueryClient = typeof queryClient;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: "/blog",
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <BlogPostsPage />,
            loader: blogPostsLoader(queryClient),
            // element: <DeferredBlogPostsPage />,
            // loader: deferredBlogPostsLoader,
          },
          {
            path: ":id",
            element: <PostDetailPage />,
            loader: blogPostDetailLoader(queryClient),
          },
        ],
      },
      {
        path: "/blog/new",
        element: <NewPostPage />,
        action: newPostAction,
      },
    ],
  },
  {
    path: "/newsletter",
    action: newsletterAction,
  },
]);

function App3() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App3;
