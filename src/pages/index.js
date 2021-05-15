import Cookies from "js-cookie";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data, revalidate } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    console.log(res);
    return res.json();
  });

  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <>
      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              Cookies.remove("hackupc-token");
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href="/signin">Login</Link>
          <p>or</p>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </>
  );
}
