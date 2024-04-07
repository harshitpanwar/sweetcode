import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='bg-slate-200 p-10 rounded-md w-fit h-fit '>{children}</div>
    </div>
  );
};

export default AuthLayout;
