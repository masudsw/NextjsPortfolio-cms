import { blogService } from '@/service/service';
import React from 'react';

const Blogs = () => {
    const blogs = blogService.getLatestPosts();
    console.log(blogs)
    return (
        <section
            id="about"
            className="bg-black flex flex-col justify-center items-center px-10 md:px-40"
        >
            <h2 className="text-white text-4xl font-bold">My blogs</h2>
        </section>
    );
};

export default Blogs;