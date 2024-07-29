import WorkSpace from '@/components/WorkSpace'

export default async function ProblemPage({ params: { problemId },  }: { params: { problemId: string }})
{
    return (
        <div className='bg-dark-layer-1 relative'>
            <WorkSpace problemId={problemId}/>
        </div>
    )
}
