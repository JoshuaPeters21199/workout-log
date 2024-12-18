'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function Register() {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userId = crypto.randomUUID();
    const workouts = [];
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            const responseUserExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });

            const { user } = await responseUserExists.json();

            if (user) {
                setError('User already exists');
                return;
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, userId, workouts
                })
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push('/');
            } else {
                console.log('User registration failed');
            }
        } catch (error) {
            console.log('Error during registration: ', error);
        }
    };

    return (
        <div className="bg-black">
            <main className="h-screen flex flex-col items-center justify-center">
                <h1 className="font-bold text-xl text-white">Register</h1>

                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-2"
                >
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Type your name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

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

                    <button className="bg-white text-black font-bold px-6 py-2 rounded-md mt-2">Register</button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <div className="text-white text-sm flex justify-end">
                        Already have an account? <Link className="underline ml-1" href={'/login'}>Login</Link>
                    </div>

                </form>
            </main>
        </div>
    )
}