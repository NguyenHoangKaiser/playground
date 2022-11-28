import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1 className="text-lg text-orange-300 uppercase">
          An error occurred!
        </h1>
        <p className="text-center">{error.message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
