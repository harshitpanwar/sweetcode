import axios from "axios";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { prisma } from "@/lib/db";

async function getProblems() {

    "use server";
    const problems:any = await prisma.problem.findMany();
    return problems;
}

async function getData(): Promise<Payment[]> {
    const result: any = await getProblems();
    return result;
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
