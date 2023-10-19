"use client"

import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useEffect } from "react"

type Props = {
    problemId: string
}

type ProblemData = {
    problemId: number
    problemName: string
    problemDifficulty: "easy" | "medium" | "hard"
    problemTags: string[]
    problemLikes: number
    problemDislikes: number
    problemDescription: string
    problemExamples: {
        name: string
        description: {
            input: string
            output: string
            explanation: string
        }
    }[]
}

const ProblemSection = (props: Props) => {


    const problemData: ProblemData = {
        problemId: 1,
        problemName: "Two Sum",
        problemDifficulty: "easy",
        problemTags: ["array", "hashmap"],
        problemLikes: 100,
        problemDislikes: 20,
        problemDescription: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. \n\nYou can return the answer in any order.",
        problemExamples: [
            {
                name:"Example 1",
                description: {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
                }
            },
            {
                name:"Example 2",
                description: {
                    input: "nums = [3,2,4], target = 6",
                    output: "[1,2]",
                    explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
                }
            },
            {
                name:"Example 3",
                description: {
                    input: "nums = [3,3], target = 6",
                    output: "[0,1]",
                    explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
                }
            }
        ]
    }

    


  return (
    <div className="flex flex-col items-center m-1">
        <p className="flex text-black text-xl font-bold mt-4">{problemData.problemName}</p>

        <div className="flex flex-row mt-4 mr-auto">

            <p className="flex text-black text-lg mr-2">{problemData.problemDifficulty}</p>
            <p className="flex text-black text-lg mr-2"><ThumbsUp height='20px'/>{problemData.problemLikes}</p>
            <p className="flex text-black text-lg mr-2"><ThumbsDown height='20px'/>{problemData.problemDislikes}</p>

        </div>



        <p className="m-1 bg-gray-300 rounded-sm p-5"> <b>Problem Statement:</b> <br/> {problemData.problemDescription}</p>
        <p className="mt-4 text-lg font-bold mr-auto">Examples:</p>
        <ul className="list-disc mr-auto mt-4">
            {problemData.problemExamples.map((example, index) => (
                <li key={index} className="ml-4">
                    <p className="font-bold">{example.name}</p>
                    <div className="m-2 bg-gray-300 rounded-sm p-5">
                        <p className="ml-4"><b>inputs: </b> {example.description.input}</p>
                        <p className="ml-4"><b>outputs: </b> {example.description.output}</p>
                        <p className="ml-4"><b>explanation: </b> {example.description.explanation}</p>

                    </div>
                </li>
            ))}
        </ul>

        <div className="flex flex-row mt-4">
            <p className="flex text-black text-lg font-bold mr-2">Tags: </p>
            {problemData.problemTags.map((tag, index) => (
                <p key={index} className="flex text-black text-lg font-bold mr-2">{tag}</p>
            ))}
        </div>
    </div>
  )
}

export default ProblemSection