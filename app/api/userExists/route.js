import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const { email } = await req.json();
        const user = User.findOne({ email }).select('_id');
        console.log('user: ', user);
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while checking existing users' }, { status: 500 });
    }
}