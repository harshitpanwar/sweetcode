import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {prisma} from "@/lib/db";
import {compare} from "bcrypt";

export const authOptions: NextAuthOptions = {

    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "email", placeholder: "john@example.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if(!credentials?.email || !credentials?.password){
                    return null;
                }

                
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if(!user){
                    return null;
                }

                const passwordValid = await compare(credentials.password, user.password);

                if(!passwordValid){
                    return null;
                }

                return {
                    id: `${user.id}`,
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
            }
          })
        ],
        callbacks: {

          async jwt({token, user}) {

            if(user){
              return {
                ...token,
                username: user.username
              }
            }
            return token;
          },

          async session({session, user,  token}) {
            return {
              ...session,
              user: {
                ...session.user,
                username: token.username
              }
            }
            return session;

          }

        }
        
}