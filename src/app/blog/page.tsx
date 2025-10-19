// app/blog/page.tsx (Server Component)

import Image from 'next/image';
import Link from 'next/link';
import { blogService } from '@/service/service';
import { ApiResponse, BlogPost } from '@/types';

// Define the API response structure used by getLatestPosts


// Assuming your BlogPost type includes: title, slug, thumbnail, views, content
// (If your API returns a simple array from getAllPosts, adjust ApiResponse usage below)

const AllBlogsPage = async () => {

    let posts: BlogPost[] = [];
    try {
        const apiResponse: ApiResponse<BlogPost> = await blogService.getAllPosts();
        posts = apiResponse.data;
    } catch (error) {
        console.error("Failed to load all blog posts:", error);
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900 pt-20 pb-16">

            <header className="container mx-auto max-w-4xl px-4 mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white border-b-4 border-gray-600 dark:border-indigo-400 pb-2">
                    All Blog Posts
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    A collection of my latest insights and articles.
                </p>
            </header>

            <main className="container mx-auto max-w-4xl px-4 space-y-12">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article
                            key={post.slug}
                            className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            {/* --- Thumbnail (Left Side on Desktop) --- */}
                            <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 hover:scale-105"
                                />
                            </div>

                            {/* --- Content (Right Side on Desktop) --- */}
                            <div className="flex flex-col justify-between w-full md:w-2/3">
                                <div>
                                    {/* Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>

                                    {/* Snippet of Content */}
                                    <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
                                        {post.content.substring(0, 200)}...
                                    </p>
                                </div>

                                {/* Meta and Read More Button */}
                                <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Views: {post.views? post.views.toLocaleString():1}
                                    </span>

                                    {/* Read More Link */}
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center"
                                    >
                                        Read More
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500 dark:text-gray-400 py-20">
                        No blog posts found at this time.
                    </p>
                )}
            </main>
        </div>
    );
};

export default AllBlogsPage;