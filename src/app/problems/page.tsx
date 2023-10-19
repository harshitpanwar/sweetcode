import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      status: "unattended",
      question: "Two Sum",
      difficulty: "easy",
    },
    {
      id: "728ed52f",
      status: "pending",
      question: "Add Two Numbers",
      difficulty: "medium",
    },
    {
      id: "728ed52f",
      status: "attended",
      question: "Longest Substring Without Repeating Characters",
      difficulty: "hard",
    },
    {
      id: "728ed52f",
      status: "completed",
      question: "Median of Two Sorted Arrays",
      difficulty: "hard",
    },
    {
      id: "728ed52f",
      status: "completed",
      question: "3 Sum",
      difficulty: "medium",
    },
    {
      id: "728ed52f",
      status: "completed",
      question: "4 Sum",
      difficulty: "hard",
    }


    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
