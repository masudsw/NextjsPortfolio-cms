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
   
    return (
        <section
            id="blogs"
            className="py-20 bg-black flex flex-col justify-center items-center px-4 md:px-10"
        >
            <h2 className="text-white text-4xl font-bold mb-12">Latest Blogs</h2>

            
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                {posts.length > 0 ? (
                    
                    posts.map((post) => (
                        
                        <CardContainer
                            key={post.slug}
                            className="inter-var w-full sm:w-80 md:w-[320px] h-full"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <CardBody className="bg-gray-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] dark:bg-black dark:border-white/[0.2] border-indigo-500/[0.5] w-auto h-full rounded-xl p-6 border transition-all duration-300">
                                    <CardItem
                                        translateZ="50"
                                        className="text-xl font-bold text-white mb-4"
                                    >
                                        {post.title}
                                    </CardItem>
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
                                    <CardItem
                                        as="p"
                                        translateZ="60"
                                        className="text-neutral-400 text-sm max-w-sm mt-4"
                                    >
                                        {post.content.substring(0, 100)}...
                                    </CardItem>          
                                    <div className="flex justify-start items-center mt-6">
                                        <CardItem
                                            translateZ={20} 
                                            as="button"
                                            className="px-4 py-2 rounded-xl bg-white hover:bg-gray-200 text-black text-xs font-bold transition-colors"
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
            <div className="mt-12">
                <Link href="/blog" className="text-lg text-white hover:underline font-medium">
                    View All Posts →
                </Link>
            </div>
        </section>
    );
};

export default Blogs;