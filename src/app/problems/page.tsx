import axios from "axios";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getProblems(): Promise<Payment[]> {
    "use server";
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/problem`);
    const data = response.data;

    // console.log(data);

    return data;
}

async function getData(): Promise<Payment[]> {
    const result: any = await getProblems();
    return result.problems;
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
