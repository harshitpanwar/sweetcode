import SignUpForm from '@/components/form/SignUpForm';
import dynamic from 'next/dynamic';

const page = dynamic(() => import('../../../components/form/SignUpForm'), { loading: () => <b>Loading...</b> })

export default page;
