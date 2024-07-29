import Card from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {

  //get jwt token from session
  const session = await getServerSession(authOptions);

  return (
    <div className="grid place-items-center h-screen">
      { 
        session ? <Card session={session}></Card> 
        :
        <div className="text-center">
          <h1><b>Welcome to SweetCode! &#127853;</b></h1>
          <p>Sign Up or Sign in to start coding!</p>
        </div>
      }
    </div>
  );
}
