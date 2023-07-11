import { selectUser } from "@/lib/redux/slices/auth.slices/selectors";
import { signOut } from "@/lib/redux/slices/auth.slices/thunks";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { useRouter } from "next/router";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();

  async function handleSignout() {
    await dispatch(signOut());

    router.push("/auth/signin");
  }

  return (
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
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                router.push("/auth/signin");
              }}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-500 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                router.push("/auth/signup");
              }}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-blue-500 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
