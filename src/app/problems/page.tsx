import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getProblems(): Promise<Payment[]> {

    "use server";

    const response = await fetch('http://localhost:3000/api/problem', {
      method: 'GET'
    })
    const data: any = await response.json();

    return data;
  

}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.

  //server action api call
  const result:any = await getProblems();

  return result.problems;

}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
