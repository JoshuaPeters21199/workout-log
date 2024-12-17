'use client'

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <main>
        <h1>Home</h1>
      </main>
    </div>
  );
}
