import { blogService } from '@/service/service';
import { ApiResponse, BlogPost } from '@/types';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import Link from 'next/link';
import Image from 'next/image';


const Blogs = async () => {
    const apiResponse: ApiResponse<BlogPost> = await blogService.getLatestPosts();


    // Now you can safely access .data
    const posts: BlogPost[] = apiResponse.data;

    // 🔑 Extract the array of posts from the 'data' property
    console.log("Blog post", posts)
    return (
        <section
            id="blogs"
            className="py-20 bg-black flex flex-col justify-center items-center px-4 md:px-10"
        >
            <h2 className="text-white text-4xl font-bold mb-12">Latest Blogs</h2>

            {/* Container for the 3 cards */}
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                {posts.length > 0 ? (
                    // 🔑 Loop through the blog posts array
                    posts.map((post) => (
                        // CardContainer: Sets up the 3D perspective and mouse tracking
                        <CardContainer
                            key={post.slug}
                            className="inter-var w-full sm:w-80 md:w-[320px] h-full"
                        >
                            {/* Wrap the whole card in a Next.js Link */}
                            <Link href={`/blog/${post.slug}`}>
                                <CardBody className="bg-gray-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] dark:bg-black dark:border-white/[0.2] border-indigo-500/[0.5] w-auto h-full rounded-xl p-6 border transition-all duration-300">

                                    {/* 1. Title - Pushed forward (translateZ="50") */}
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-white mb-4"
                                    >
                                        {post.title}
                                    </CardItem>

                                    {/* 2. Thumbnail Image - Pushed further (translateZ="100") and rotated */}
                                    <CardItem
                                        translateZ="100"
                                        rotateX={5}
                                        className="w-full relative h-48"
                                    >
                                        <Image
                                            src={post.thumbnail}
                                            height="1000"
                                            width="1000"
                                            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                            alt={post.title}
                                        />
                                    </CardItem>

                                    {/* 3. Description/Content Snippet - Base text (translateZ="60") */}
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-neutral-400 text-sm max-w-sm mt-4"
                                    >
                                        {/* Show a portion of the description */}
                                        {post.content.substring(0, 100)}...
                                    </CardItem>

                                    {/* 4. Read More Button/Link */}
                                    <div className="flex justify-start items-center mt-6">
                                        <CardItem
                                            translateZ={20} // Pushed slightly forward
                                            as="button"
                                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                                        >
                                            Read More →
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </Link>
                        </CardContainer>
                    ))
                ) : (
                    <p className="text-gray-400">No blog posts available.</p>
                )}
            </div>

            {/* Link to the main blog page */}
            <div className="mt-12">
                <Link href="/blog" className="text-lg text-indigo-400 hover:underline font-medium">
                    View All Posts →
                </Link>
            </div>
        </section>
    );
};

export default Blogs;