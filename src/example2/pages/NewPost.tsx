import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

function NewPostPage() {
  const data = useActionData() as { status?: number; message?: string };

  const navigation = useNavigation();
  console.log(navigation.state);

  const navigate = useNavigate();

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {data && data.message && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === "submitting"}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const post = {
    title: formData.get("title") as string,
    body: formData.get("post-text") as string,
  };
  try {
    await savePost(post);
  } catch (error: any) {
    if (error.status === 422) {
      return error;
    }
    throw error;
  }
  return redirect("/blog");
}
