import WorkSpace from '@/components/WorkSpace'
import Split from 'react-split'

export default async function ProblemPage({

    params: { problemId },
    }: {
    params: { problemId: string }
    }){

        //api request to get the problem data

        return (<div className='bg-dark-layer-1 relative'><WorkSpace problemId={problemId}/></div>)
    }