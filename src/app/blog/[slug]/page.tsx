// app/blog/[slug]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation'; 
import { BlogPost} from '@/types'; 

async function getBlogDetailData(slug: string): Promise<BlogPost> {
    const { blogService } = require('@/service/service');
    try {
        const post = await blogService.getPostBySlug(slug);
        if (!post || !post.title) notFound();
        return post;
    } catch (error) {
        console.error(`Failed to fetch blog post: ${slug}`, error);
        notFound();
    }
}

interface BlogPostDetailPageProps {
    params: {
        slug: string; 
    };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
    const { slug } = params;
    const post = await getBlogDetailData(slug); 
    const createdDate = new Date(post.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    const updatedDate = new Date(post.updatedAt).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <article className="container mx-auto max-w-4xl p-4 md:p-8 lg:p-12 bg-white dark:bg-gray-900 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-4">
                <span>By: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{post.author.name}</span></span>
                <span>• Views: {post.views.toLocaleString()}</span>                 
                <span>• Published: {createdDate}</span>
                {post.createdAt !== post.updatedAt && (
                    <span>• Updated: {updatedDate}</span>
                )}
            </div>
            <div className="relative w-full h-64 md:h-96 lg:h-[400px] mb-10 rounded-lg shadow-xl overflow-hidden">
                <Image 
                    src={post.thumbnail} 
                    alt={post.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 80vw"
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                <p>{post.content}</p>
            </div>
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full text-sm font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

        </article>
    );
}