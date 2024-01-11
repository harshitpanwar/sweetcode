"use client"

type Props = {
  problemId: string
}
import Split from 'react-split';
import CodeEditor from './CodeEditor';
import ProblemSection from './ProblemSection';
import { useEffect, useState } from 'react';


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


const WorkSpace = (props: Props) => {

  const [apiData, setApiData] = useState<any>(null)

  useEffect(() => {
     
      const getProblemData = async () => {
          const res = await fetch(`http://localhost:3000/api/problem?id=${Number(props.problemId+1)}`)
          const data = await res.json()
          setApiData(data?.problem);
      }
      getProblemData();
  }, [])


  const problemData: ProblemData = {
      problemId: apiData?.id,
      problemName: apiData?.title,
      problemDifficulty: apiData?.difficulty,
      problemTags: apiData?.config?.tags,
      problemLikes: apiData?.likes,
      problemDislikes: apiData?.dislikes,
      problemDescription: apiData?.description,
      problemExamples: apiData?.config?.examples,
      problemTestCases: apiData?.config?.testCases
  }
  const code: string = apiData?.config?.code?.visible;

  console.log("codesdfsadfsad", code);

  return (
    <Split className="split" sizes={[35,65]} minSize={40}>
        <ProblemSection problemData= {problemData}/>
        <CodeEditor code = {code} problemId = {problemData?.problemId}/>
    </Split>
  )
}

export default WorkSpace