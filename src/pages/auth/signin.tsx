import Navbar from "@/components/Navbar";
import { signIn } from "@/lib/redux/slices/auth.slices/thunks";
import { useDispatch } from "@/lib/redux/store";
import { FormEvent } from "react";

export default function SigninPage() {
  const dispatch = useDispatch();

  function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    dispatch(signIn({ email, password }));
  }

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form method="POST" onSubmit={handleSignIn}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold
                    rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
