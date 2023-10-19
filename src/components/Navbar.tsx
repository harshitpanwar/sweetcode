import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { FileCode2 , Braces } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountnav from './UserAccountnav';

const Navbar = async() => {

  const session = await getServerSession(authOptions);

  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/' className='flex'>
          SweetCode
          <FileCode2 className='ml-2' />
        </Link>

        {
          session?.user ? (
            <UserAccountnav />
          ):(
            <Link className={buttonVariants()} href='/sign-in'>
              Sign in
            </Link>
          )

        }
       
      </div>
    </div>
  );
};

export default Navbar;
