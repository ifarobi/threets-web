import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function SigninPage() {
  async function handleSignIn(formData: FormData) {
    "use server";
    try {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));

      const supabase = createServerActionClient<Database>({ cookies });
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      revalidatePath("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form action={handleSignIn}>
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
