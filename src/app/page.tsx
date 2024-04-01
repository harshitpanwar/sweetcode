import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session:any = await getServerSession(authOptions);
  
  //get jwt token from session

  return (
    <div className="flex flex-col justify-center align-middle">
      <h1>Home</h1>
      <p>Welcome {session?.user?.name}</p>
      <p>Email {session?.user?.email}</p>
      <p>Username {session?.user?.username}</p>
      <p>Easy Solved {session?.user?.easy}</p>
      <p>Medium Solved {session?.user?.medium}</p>
      <p>Hard Solved {session?.user?.hard}</p>
    </div>
  );
}
