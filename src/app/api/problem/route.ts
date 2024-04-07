import { NextResponse } from "next/server";
import {prisma} from "@/lib/db";
import * as z from "zod";

const problemSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().min(1, 'Description is required').max(100),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    config: z.object({
        tags: z.array(z.string()),

        testCases: z.array(z.object({
            input: z.string() || z.number() || z.array(z.string()) || z.array(z.number()),
            output: z.string() || z.number() || z.array(z.string()) || z.array(z.number()),
        })),
        
        examples: z.array(z.object({
            input: z.string(),
            output: z.string(),
            explanation: z.string(),
        })),
    }),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, difficulty, config } = problemSchema.parse(body);

        //check if problem already exists
        const existingProblem = await prisma.problem.findUnique({
            where: { title: title}
        });

        if(existingProblem){
            return NextResponse.json(
            {
                problem: null,
                message: "Problem with this title already exists"
            },
            {status: 409},    
            );
        }

        //create problem
        const newProblem = await prisma.problem.create({
            data: {
                title: title,
                description: description,
                difficulty: difficulty,
                config: config,
            }
        });

        return NextResponse.json({
            problem: newProblem,
            message: "Problem created successfully"
            },
            {status: 201},    
        );
    }
    catch (error: any) {
        return NextResponse.json(
            {
                problem: null,
                message: error.message
            },
            {status: 500},    
        );
    }
} 

export async function GET(req: Request) {
    try {
        //check for particular problem id
        const {searchParams} = new URL(req.url);
        const param = searchParams.get("id");

        if(param){
            const problem = await prisma.problem.findUnique({
                where: { id: Number(param) }
            });
    
            return NextResponse.json({
                problem
            });
        }

        //get all problems if no id is provided
    
        const problems = await prisma.problem.findMany();

        return NextResponse.json({
            problems
        });
    }

    catch (error: any) {
        return NextResponse.json(
            {
                problems: null,
                message: error.message
            },
            {status: 500},    
        );
    }
}