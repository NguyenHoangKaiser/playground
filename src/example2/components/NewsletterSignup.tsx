import { FormEvent, useRef } from "react";
import { useFetcher } from "react-router-dom";

function NewsletterSignup() {
  const emailEl = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher();

  function signupForNewsletterHandler(event: FormEvent) {
    event.preventDefault();
    const enteredEmail = emailEl.current?.value || "";
    // could validate input here
    fetcher.submit(
      // better: use fetcher.Form instead
      { email: enteredEmail },
      { method: "post", action: "/newsletter" }
    );
  }

  return (
    <section className="border-solid border-t-2 my-8 mx-auto max-w-xs pt-4 border-[#ccc] flex flex-col gap-4 items-center justify-evenly">
      <h2 className="text-lg">Sign up for our weekly newsletter</h2>
      <form onSubmit={signupForNewsletterHandler}>
        <input
          ref={emailEl}
          className="leading-6 text-black p-1 border border-solid border-[#fcb66b]"
          id="email"
          type="email"
          placeholder="Your email"
          aria-label="Your email address."
        />
        <button className="leading-6 cursor-pointer hover:bg-[#fda84c] py-1 px-2 bg-[#fcb66b] rounded-r-[4px] border border-solid border-[#fcb66b]">
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default NewsletterSignup;
