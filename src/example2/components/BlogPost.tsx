
function BlogPost({ title, text }: { title: string; text: string }) {
  return (
    <article className="my-8 mx-auto text-center capitalize max-w-[40rem]">
      <h1>{title}</h1>
      <p>{text}</p>
    </article>
  );
}

export default BlogPost;
