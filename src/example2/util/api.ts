import { sleep } from "./sleep";
import axios from "axios";

export interface IPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type TPostResponse = IPostData[];

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// export async function getPosts(): Promise<IData[]> {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!response.ok) {
//     throw new Response("Failed to fetch posts.", { status: 500 });
//   }
//   return response.json();
// }

export async function getPosts() {
  await sleep(2000);

  try {
    const { data, status } = await api.get<TPostResponse>("/posts");
    console.log("response status is: ", status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Error when get posts: ${error.message}`);
      throw {
        message: `Failed to fetch posts, ${error.message}`,
        status: 500,
      };
    } else {
      console.log("unexpected error: ", error);
      throw {
        message: `Failed to fetch posts: ${error}`,
        status: 500,
      };
    }
  }
}

// export async function getSlowPosts() {
//   await sleep(2000);
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!response.ok) {
//     throw new Response("Failed to fetch posts.", { status: 500 });
//   }
//   return response.json();
// }

export async function getSlowPosts() {
  await sleep(2000);
  try {
    const { data, status } = await api.get<TPostResponse>("/posts");
    console.log("response status is: ", status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`axios error message: ${error.message}`);
      throw {
        message: `Error when fetching slow posts: ${error.message}`,
        status: 500,
      };
    } else {
      console.log("unexpected error: ", error);
      throw {
        message: `Error when fetching slow posts: ${error}`,
        status: 500,
      };
    }
  }
}

// export async function getPost(id: number) {
//   return fetch("https://jsonplaceholder.typicode.com/posts/" + id);
// }

export async function getPost(id: string) {
  try {
    const { data, status } = await api.get<IPostData>(`/posts/${id}`);
    console.log("response status is: ", status);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("axios error message: ", error.message);
      throw {
        message: `Failed to fetch post with id: ${id}, ${error.message}`,
        status: 500,
      };
    } else {
      console.log(`unexpected error when get post: ${error}`);
      throw {
        message: `Failed to fetch post with id: ${id}, ${error}`,
        status: 500,
      };
    }
  }
}

// export async function savePost(data: any) {
//   const post = {
//     title: data.get("title"),
//     body: data.get("post-text"),
//   };

//   if (post.title.trim().length < 5 || post.body.trim().length < 10) {
//     return { isError: true, message: "Invalid input data provided." };
//   }

//   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify(post),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw response;
//   }
// }

export async function savePost(post: { title: string; body: string }) {
  if (post.title.trim().length < 5 || post.body.trim().length < 10) {
    throw { message: "Invalid input data provided.", status: 422 };
  }

  try {
    const { status } = await api.post("/posts", post);
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: `Could not save post, ${error.message}`,
        status: error.response?.status,
      };
    } else {
      throw { message: "Could not save post.", status: 500 };
    }
  }
}
