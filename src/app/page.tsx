import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session:any = await getServerSession(authOptions);
  console.log(session);

  return <h1 className='text-4xl'>{session?.user.email}</h1>;
}
