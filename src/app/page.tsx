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
import { useRouter } from "next/navigation";
import ThreetItem from "@/components/ThreetItem";

export default function Home() {
  const supabase = useSupabaseAnon();
  const dispatch = useDispatch();
  const threets = useSelector(selectThreets);
  const user = useSelector(selectUser);
  const router = useRouter();

  const handleSignout = useCallback(async () => {
    await supabase.auth.signOut();
    dispatch(authSlice.actions.clearSession());
    dispatch(authSlice.actions.clearSession());
  }, [supabase.auth, dispatch]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        if (!user) {
          throw new Error("You must be logged in to post.");
        }

        const formData = new FormData(event.target as HTMLFormElement);
        const content = formData.get("content") as string;
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
      <div className="bg-blue-500 py-4 flex justify-between w-full">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl font-bold">Threet</h1>
        </div>
        <div className="container mx-auto px-4">
          {user ? (
            <div className="flex justify-end">
              <p className="text-white mr-4">{user.email}</p>
              <button
                onClick={() => {
                  handleSignout();
                }}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-500 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  router.push("/signin");
                }}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-500 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
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
