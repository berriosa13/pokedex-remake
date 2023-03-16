import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./login.js";

function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div>
        <h1> hi {session.user.name}</h1>
        <img src={session.user.image} alt={session.user.name + " photo"} />
        <button onClick={signOut}>sign out</button>
      </div>
    );
  }
  return (
      <Login/>
  );
}
export default HomePage;
