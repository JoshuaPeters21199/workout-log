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
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}
