"use client"

import Split from 'react-split';
import CodeEditor from './CodeEditor';
import ProblemSection, { ProblemData } from './ProblemSection';
import { useEffect, useState } from 'react';


type Props = {
  problemId: string
}

const WorkSpace = (props: Props) => {

  const [apiData, setApiData] = useState<any>(null)

  useEffect(() => {
     
      const getProblemData = async () => {
          const res = await fetch(`/api/problem?id=${Number(props.problemId)+1}`)
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

  return (
    <Split className="split" sizes={[40,60]} minSize={40}>
        <ProblemSection problemData= {problemData}/>
        <CodeEditor code = {code} problemId = {problemData?.problemId}/>
    </Split>
  )
}

export default WorkSpace
