import BlogForm from '@/components/ui/blog-form';
import React from 'react';


const CreateBlog = () => {
    return (
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl  my-8'>
            <h1 className='text-2xl font-semibold mb-6 text-center'>Create Blog post</h1>
            <BlogForm/>
        </div>
    );
};

export default CreateBlog;