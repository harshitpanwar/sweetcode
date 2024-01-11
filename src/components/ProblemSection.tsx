"use client"

import { ThumbsDown, ThumbsUp } from "lucide-react"

type ProblemData = {
    problemId: number
    problemName: string
    problemDifficulty: "easy" | "medium" | "hard"
    problemTags: string[]
    problemLikes: number
    problemDislikes: number
    problemDescription: string
    problemExamples: {
            input: string
            output: string
            explanation: string
    }[],
    problemTestCases: {
        input: string
        output: string
    }[]
}

type Props = {
    problemData: ProblemData
};


const ProblemSection = (props: Props) => {

    const problemData = props.problemData;

  return (
    <div className="flex flex-col items-center m-1">
        <p className="flex text-black text-xl font-bold mt-4 mr-auto ml-1">{problemData.problemName}</p>

        <div className="flex flex-row mt-4 mr-auto">

            <p className="flex text-black text-lg mr-2">{problemData.problemDifficulty}</p>
            <p className="flex text-black text-lg mr-2"><ThumbsUp height='20px'/>{problemData.problemLikes}</p>
            <p className="flex text-black text-lg mr-2"><ThumbsDown height='20px'/>{problemData.problemDislikes}</p>

        </div>



        <p className="m-1 bg-gray-300 rounded-sm p-5"> <b>Problem Statement:</b> <br/> {problemData.problemDescription}</p>
        <p className="mt-4 text-lg font-bold mr-auto">Examples:</p>
        <ul className="list-disc mr-auto mt-4">
            {problemData?.problemExamples?.map((example, index) => (
                <li key={index} className="ml-4">
                    <div className="m-2 bg-gray-300 rounded-sm p-5">
                        <p className="ml-4"><b>inputs: </b> {example.input}</p>
                        <p className="ml-4"><b>outputs: </b> {example.output}</p>
                        {example?.explanation?<p className="ml-4"><b>explanation: </b> {example.explanation}</p>:null}

                    </div>
                </li>
            )) || <li className="ml-4"> No Examples for this Case </li>}
        </ul>

        <div className="flex flex-row mt-4 mr-auto">
            <p className="flex text-black text-lg font-bold mr-2">Tags: </p>
            {problemData?.problemTags?.map((tag, index) => (
                <p key={index} className="flex text-black text-lg font-bold mr-2">{tag}</p>
            )) || <p className="flex text-black text-lg font-bold mr-2">No Tags</p>}
        </div>
    </div>
  )
}

export default ProblemSection