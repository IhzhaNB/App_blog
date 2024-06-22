import { useSession } from "@/context/authContext";

export default function Home() {
  const { user } = useSession();

  console.log(user);

  return <div>Home</div>;
}
