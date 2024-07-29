'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UserAccountnav = () => {
  const router = useRouter();
  return (
    <Button onClick={() => {
      signOut();
      router.push('/');
    }}>
        Sign Out
    </Button>
  )
}

export default UserAccountnav
