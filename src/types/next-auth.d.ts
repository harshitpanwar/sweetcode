import NextAuth from "next-auth"

export declare module "next-auth" {

    interface User {
        username: string
    }
    interface Session {
        user, token: User & {
            easy: number,
            medium: number,
            hard: number
        }
    }
}