export interface IPost {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reaction: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

export type TStatus = "idle" | "loading" | "succeeded" | "failed";

export type TReaction = keyof IPost["reaction"];
