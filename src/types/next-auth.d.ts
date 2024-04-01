import NextAuth from "next-auth"

declare module "next-auth" {

    interface User {
        username: string
    }
    interface Session {
        user: User & {
            username: string,
            easy: number,
            medium: number,
            hard: number
        },
        token: {
            username: string,
            easy: number,
            medium: number,
            hard: number
        }
    }
}