'use client'

import Navbar from "@/components/Navbar"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Workouts() {
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

            </main>
        </div>
    )
}