import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { Code } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountnav from './UserAccountnav';

const Navbar = async() => {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-zinc-100 py-4 border-b border-s-zinc-200 w-full z-10 top-0 '>
      <div className='pl-5 pr-5 flex items-center justify-between'>
        <ul className='display-inline'>
          <li>
            <Link href='/' className='flex text-lg'>
              SweetCode
              <Code className=' flex mx-2 my-0.5' />
            </Link>
          </li>
          <li>
            <Link href='/problems' className='flex text-lg align-self'>
              Problems
            </Link>
          </li>
        </ul>
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
