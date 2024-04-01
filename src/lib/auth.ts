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
                    username: user.username,
                    easy: user.easySolved,
                    medium: user.mediumSolved,
                    hard: user.hardSolved,
                }
            }
          })
        ],
        callbacks: {

          async jwt({token, user}) {

            // console.log("jwt", token);
            // console.log("user", user);
            return {...token, ...user};
          },

          async session({session, token, user}) {
            session.user.username = String(token?.username);
            session.user.easy = Number(token?.easy);
            session.user.medium = Number(token?.medium);
            session.user.hard = Number(token?.hard);
              return {
                ...session,
                ...token,
                ...user
              };
            },

          },

        }
        
