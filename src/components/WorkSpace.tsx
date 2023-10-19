"use client"

type Props = {
  problemId: string
}
import Split from 'react-split';
import CodeEditor from './CodeEditor';
import ProblemSection from './ProblemSection';

const WorkSpace = (props: Props) => {
  return (
    <Split className="split" sizes={[35,65]} minSize={40}>
        <ProblemSection problemId= {props.problemId}/>
        <CodeEditor/>
    </Split>
  )
}

export default WorkSpace