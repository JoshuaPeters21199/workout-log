import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        console.log('Invalid email or password');
                        return null;
                    }

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                    if (!isValidPassword) {
                        console.log('Invalid email or password');
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        workouts: user.workouts,
                    }
                } catch (error) {
                    console.log('An error occurred: ', error);
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.workouts = token.workouts;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.workouts = user.workouts;
            }
            return token;
        }
    },
    secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };