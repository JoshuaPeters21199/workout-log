'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result.error) {
            setError('Invalid email or password')
        }

        if (result.ok) {
            return router.push('/')
        }
    }
    

    return (
        <div className="bg-black">
            <main className="h-screen flex flex-col items-center justify-center">
                <h1 className="font-bold text-xl text-white">Login</h1>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-2"
                >
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Type your email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Type your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="bg-white text-black font-bold px-6 py-2 rounded-md mt-2">Sign In</button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <div className="text-white text-sm flex justify-end">
                        Don't have an account? <Link className="underline ml-1" href={'/register'}>Register</Link>
                    </div>
                </form>
            </main>
        </div>
    )
}