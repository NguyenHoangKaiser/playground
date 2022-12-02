import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage, { loader as blogPostsLoader } from "./pages/BlogPosts";
// import DeferredBlogPostsPage, {
//   loader as deferredBlogPostsLoader,
// } from "./pages/DeferredBlogPosts";
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
import ReduxPage from "src/example3/ReduxPage";
import { Provider as ReduxProvider } from "react-redux";
import store from "src/example3/store/store";
import { fetchUsers } from "src/example3/features/users/usersSlice";

store.dispatch(fetchUsers());

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
      // {
      //   path: "/note",
      //   element: <TodoList />,
      // },
      {
        path: "/redux",
        element: <ReduxPage />,
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
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </ReduxProvider>
    </>
  );
}

export default App3;
