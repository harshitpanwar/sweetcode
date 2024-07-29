// create user route in nextjs

import { NextResponse } from "next/server";
import {prisma} from "@/lib/db";
import {hash} from "bcrypt";
import * as z from "zod";

// Define schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, username, email, password } = userSchema.parse(body);

        //check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email}
        });

        if(existingUserByEmail){
            return NextResponse.json(
            {
                user: null,
                message: "User with this email already exists"
            },
            {status: 409},    
            );
        }

        //check if username already exists
        const existingUserByUsername = await prisma.user.findUnique({
            where: { username: username}
        });

        if(existingUserByEmail){
            return NextResponse.json(
            {
                user: null,
                message: "This username is not available!"
            },
            {status: 409},    
            );
        }

        //hash password
        const hashedPassword = await hash(password, 10);

        //create user
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            newUser
        })

    }
    
    catch (error: any) {
        return NextResponse.json({
            user: null,
            message: error?.message
            }, {status: 500
        })
    }
}