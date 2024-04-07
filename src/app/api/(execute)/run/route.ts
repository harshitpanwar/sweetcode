import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import * as z from "zod"
import { insertIntoQueue } from "@/lib/rabbit-mq"

const executeSchema = z.object({

    code: z.string().min(5, 'Code is required'),
    problemId: z.number().int().positive(),
    language: z.enum(["javascript"]),

});

export async function POST(req: Request) {
    try{
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if(!email){
            throw new Error("No email found");
        }

        //find the user existing in the database
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if(!user){
            throw new Error("User not found");
        }

        // get req body
        const body = await req.json();

        const {code, problemId, language} = executeSchema.parse(body);

        //find the problem existing in the database
        const problem = await prisma.problem.findUnique({
            where: { id: problemId }
        });

        if(!problem){
            throw new Error("Problem not found");
        }

        let newSubmission = await prisma.submissions.create({
            data: {
              problemId: problemId,
              userId: user.id,
              code: code,
              language: language,
              status: "pending"
            }
        })

        const insertObject = {
            id: newSubmission.id,
            code: code,
            language: language,
            problemId: problemId,
            userId: user.id,
        }

        //insert the code into the queue
        const addToQueue = await insertIntoQueue(JSON.stringify(insertObject));
        console.log("addToQueue", addToQueue);
        
        if(!addToQueue){

            //update the user's submissions
            newSubmission = await prisma.submissions.update({
                where: { id: newSubmission.id },
                data: {
                    status: "error"
                }
            });

            throw new Error("Error inserting into queue");
        }

        //update the user's submissions
        newSubmission = await prisma.submissions.update({
            where: { id: newSubmission.id },
            data: {
                problemId: problemId,
                userId: user.id,
                code: code,
                language: language,
                status: "queued"
            }
        });

        return NextResponse.json(newSubmission, {status: 201})
      }

      catch(error: any){
        return NextResponse.json(
            {
                session: null,
                message: error.message
            },
            {status: 400},    
        );
    }
}
