import { Database } from "@/types/database.types";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const supabase = createPagesServerClient<Database>(context);

    const { req } = context;

    const code = req.url?.split("?code=")[1];

    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (e) {
    console.error(e);

    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
};

export default function CallbackPage() {
  return <div>Redirecting...</div>;
}
