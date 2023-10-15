"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  status: "unattended" | "pending" | "attended" | "completed" 
  question: string
  difficulty: "easy" | "medium" | "hard"
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "question",
    header: "Problem",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
]
