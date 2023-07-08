import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  const { data: threets } = await supabase.from("threet_post").select("*");

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <form className="mb-8">
          <textarea
            placeholder="What's happening?"
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Tweet
          </button>
        </form>
        {threets && threets.length > 0 ? (
          <div>
            {threets.map((threet, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-4">
                <p className="mb-2">{threet.content}</p>
                <button className="text-blue-500 hover:underline">Reply</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No tweets to display.</p>
        )}
      </div>
    </main>
  );
}
