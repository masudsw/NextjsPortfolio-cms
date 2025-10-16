"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- Assuming these components are available ---
import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
// ---------------------------------------------

// Define the data shape you expect from the server
interface Post {
    id:number;
    slug: string; // Assuming an ID is present for operations
    title: string;
    content: string;
    createdAt: string;
}

const BlogManage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
            if (!apiUrl) {
                console.error("API URL is not set.");
                setLoading(false);
                return;
            }
         
            try {
                const response = await fetch(`${apiUrl}/post`, {
                    method: 'GET',
                    cache: 'no-store', // Always get fresh data
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(`Failed to fetch posts: ${response.status}`)
                    throw new Error(errorData.message || `Failed to fetch posts: ${response.status}`); 
                }
                const data = await response.json();
                setPosts(data.data); 
            } catch (error: any) {
                console.error("Fetch Error:", error);
                toast.error(
                    "Error fetching posts", 
                    {
                        description: error.message || "Could not load blog data.",
                    }
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [toast]); 

    // --- Action Handlers ---

   // Inside your BlogManage component, replace the handleDelete function:

const handleDelete = (postSlug: string) => {
    
    toast.warning('Are you absolutely sure?', {
        description: `This action will permanently delete the post with slug: ${postSlug}.`,
        duration: Infinity, // Keep the toast visible until the user interacts
        closeButton: true,
        
        // 🔑 1. Define the action button for CONFIRMING the delete
        action: {
            label: 'Yes, Delete Post',
            onClick: async () => {
                // 🔑 2. Execute the DELETION logic here
                const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
                
                // Optimistically remove the post from the UI
                setPosts(currentPosts => currentPosts.filter(post => post.slug !== postSlug));
                
                try {
                    const response = await fetch(`${apiUrl}/post/${postSlug}`, { 
                        method: 'DELETE',
                        credentials: 'include',
                    });
                    
                    if (!response.ok) {
                        throw new Error("Server failed to delete post.");
                    }
                    
                    // Success toast after deletion
                    toast.success("Post deleted successfully.");

                } catch (error) {
                    console.error("Delete failed:", error);
                    // Rollback UI (optional, but good practice)
                    // You might need to re-fetch or use a different state mechanism here
                    
                    toast.error("Deletion Failed", {
                        description: "Could not delete the post on the server. Please refresh.",
                    });
                }
            },
        },
        // 🔑 3. Use an 'Error' type for visual emphasis (optional)
        style: {
            backgroundColor: 'var(--red-600)', // Or use Tailwind class names if configured
            color: 'white',
        }
    });
    
    // The initial handleDelete function does *not* do the deletion itself anymore.
};

    const handleEdit = (slug: string) => {
        // Navigate to your dedicated edit page
        router.push(`/dashboard/blog/edit/${slug}`);
    };

    // --- Rendering Logic ---

    if (loading) {
        return <div className="p-8 text-center">Loading blog posts...</div>;
    }

    if (posts.length === 0) {
        return <div className="p-8 text-center text-gray-500">No blog posts found.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Blog Post Management</h1>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">ID</TableHead>
                            <TableHead className="w-[200px]">Title</TableHead>
                            <TableHead className="hidden sm:table-cell">Content Snippet</TableHead>
                            <TableHead className="w-[150px]">Created At</TableHead>
                            <TableHead className="w-[150px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">#{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                                    {post.content.substring(0, 50)}...
                                </TableCell>
                                <TableCell>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="flex space-x-2 justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(post.slug)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(post.slug)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BlogManage;