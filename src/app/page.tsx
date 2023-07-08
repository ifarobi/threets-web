"use client";

import { selectUser } from "@/lib/redux/slices/auth.slices/selectors";
import { authSlice } from "@/lib/redux/slices/auth.slices/slice";
import { selectThreets } from "@/lib/redux/slices/threet.slices/selectors";
import {
  addThreet,
  fetchThreets,
} from "@/lib/redux/slices/threet.slices/thunks";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useSupabaseAnon } from "@/lib/supabase";
import { Session } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useCallback, useEffect } from "react";

export default function Home() {
  const supabase = useSupabaseAnon();
  const dispatch = useDispatch();
  const threets = useSelector(selectThreets);
  const user = useSelector(selectUser);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!user) {
          throw new Error("You must be logged in to post.");
        }

        const formData = new FormData(event.target as HTMLFormElement);
        const content = formData.get("content") as string;

        console.log(content);
        await dispatch(
          addThreet({
            content,
            user: user.id,
          })
        );

        dispatch(fetchThreets());
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    function setSessionAndUser(session: Session | null) {
      if (session) {
        dispatch(authSlice.actions.setUser(session.user));
        dispatch(
          authSlice.actions.setSession({
            access_token: session.access_token,
            expires_at: session.expires_at,
            expires_in: session.expires_in,
            refresh_token: session.refresh_token,
            token_type: session.token_type,
            provider_refresh_token: session.provider_refresh_token,
            provider_token: session.provider_token,
          })
        );
      } else {
        dispatch(authSlice.actions.clearSession());
        dispatch(authSlice.actions.clearUser());
      }
    }

    dispatch(fetchThreets());

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      switch (event) {
        case "INITIAL_SESSION":
        case "SIGNED_IN":
          setSessionAndUser(session);
          break;
        case "SIGNED_OUT":
          setSessionAndUser(null);
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, supabase.auth]);

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <form className="mb-8" method="POST" onSubmit={handleSubmit}>
          <textarea
            placeholder="What's happening?"
            name="content"
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
