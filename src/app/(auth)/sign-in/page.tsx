import dynamic from 'next/dynamic';

const page = dynamic(() => import('../../../components/form/SignInForm'), { loading: () => <b>Loading...</b> })

export default page;
