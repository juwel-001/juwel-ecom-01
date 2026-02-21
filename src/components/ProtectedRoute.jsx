import { useUser } from "@clerk/clerk-react";
import React from "react";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();

  const clerkLoginURL =
    "https://artistic-tomcat-87.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A5173%2F";

  if (!isSignedIn) {
    // Logout থাকলে user কে login page এ পাঠানো হবে
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          You need to login first!
        </h2>
        <p className="text-gray-600 mb-6">
          To view this page (like your Cart), please login first.
        </p>
        <a
          href={clerkLoginURL}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition-all"
        >
          Login Now
        </a>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;