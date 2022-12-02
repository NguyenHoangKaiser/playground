import { useDispatchTyped } from "src/example3/store/reduxHook";
import { IPost, TReaction } from "../types";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

export default function ReactionButton({ post }: { post: IPost }) {
  const dispatch = useDispatchTyped();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() =>
        dispatch(
          reactionAdded({ postId: post.id, reaction: name as TReaction })
        )
      }
    >
      {emoji} {post.reaction[name as TReaction]}
    </button>
  ));

  return <div className="flex-container">{reactionButtons}</div>;
}
