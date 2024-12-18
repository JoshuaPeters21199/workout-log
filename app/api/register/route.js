import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { name, email, password, userId, workouts } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        await User.create({ name, email, password: hashedPassword, userId, workouts });

        return NextResponse.json({ message: 'User registered' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while registering the user' }, { status: 500 });
    }
}