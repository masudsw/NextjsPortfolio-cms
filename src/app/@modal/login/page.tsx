import LoginForm from '@/components/ui/login-form';
import React, { Suspense } from 'react';

const Page = () => {
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center gap-7'>
            <h1 className='text-4xl font-semibold'>Login page</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>


        </main>
    );
};

export default Page;