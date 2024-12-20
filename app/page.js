'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  return (
    <div className="bg-black h-screen">
      <Navbar />

      <main>
        <h1></h1>
      </main>
    </div>
  );
}
