"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  status? : "Unattended" | "Pending" | "Attended" | "Completed" 
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Problem",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
]
