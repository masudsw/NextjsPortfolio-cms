import LoginForm from '@/components/ui/login-form';
import React from 'react';

const Page = () => {
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center gap-7'>
            <h1 className='text-4xl font-semibold'>Login page</h1>
            <LoginForm/>

        </main>
    );
};

export default Page;