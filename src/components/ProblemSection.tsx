"use client"

import { useEffect } from "react"

type Props = {
    problemId: string
}

type ProblemData = {
    problemId: number
    problemName: string
    problemDescription: string
    problemExamples: {
        name: string
        description: string
    }[]
}

const ProblemSection = (props: Props) => {


    const problemData: ProblemData = {
        problemId: 1,
        problemName: "Problem 1",
        problemDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sapiente? Nesciunt voluptatum delectus nulla impedit debitis, vero tempora aliquid iure dolores facilis earum numquam saepe incidunt cupiditate animi, dolore illum.  ",
        problemExamples: [
            {
                name:"Example 1",
                description: "This is Example 1"
            },
            {
                name:"Example 2",
                description: "This is Example 2"
            },
            {
                name:"Example 3",
                description: "This is Example 3"
            },
        ]
    }

    


  return (
    <div className="flex flex-col items-center">
        <p className="flex text-black text-xl font-bold mt-4">{problemData.problemName}</p>
        <p className="mt-4">{problemData.problemDescription}</p>
        <p className="mt-4 text-lg font-bold mr-auto">Examples:</p>
        <ul className="list-disc mr-auto mt-4">
            {problemData.problemExamples.map((example, index) => (
                <li key={index} className="ml-4">
                    <p className="font-bold">{example.name}</p>
                    <p>{example.description}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProblemSection