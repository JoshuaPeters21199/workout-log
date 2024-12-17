'use client'

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"

export default function Login() {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    

    return (
        <div>
            <main>

            </main>
        </div>
    )
}