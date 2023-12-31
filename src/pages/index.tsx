import Navbar from "@/components/Navbar";
import ThreetItem from "@/components/ThreetItem";
import { selectUser } from "@/lib/redux/slices/auth.slices/selectors";
import { fetchUser } from "@/lib/redux/slices/auth.slices/thunks";
import { selectThreets } from "@/lib/redux/slices/threet.slices/selectors";
import {
  addThreet,
  fetchThreets,
} from "@/lib/redux/slices/threet.slices/thunks";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const threets = useSelector(selectThreets);
  const user = useSelector(selectUser);
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!user) {
          return router.push('/auth/signin')
        }

        await dispatch(
          addThreet({
            content,
            user: user.id,
          })
        );

        setContent("");
      } catch (error) {
        console.error(error);
      }
    },
    [content, dispatch, user]
  );

  useEffect(() => {
    dispatch(fetchThreets());

    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <form className="mb-8" method="POST" onSubmit={handleSubmit}>
          <textarea
            placeholder="What's happening?"
            name="content"
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
              <ThreetItem key={index} threet={threet} />
            ))}
          </div>
        ) : (
          <p>No tweets to display.</p>
        )}
      </div>
    </main>
  );
}
