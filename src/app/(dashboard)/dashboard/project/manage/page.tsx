// src/app/dashboard/project/manage/ProjectManage.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

// ---------------------------
// 🎯 DATA SHAPE DEFINITION
// ---------------------------
interface Project {
    id: number; // For table key and deletion
    slug:string;
    name: string;
    description: string;
    projectlink: string;
    livesite: string;
    thumbnail: string;
    features: string[]; // Assume API returns features as an array
}

const ManageProject = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchProjects = async () => {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!apiUrl) {
            console.error("API URL is not set.");
            setLoading(false);
            return;
        }

        try {
            // Assuming your backend uses GET /project to get all projects
            const response = await fetch(`${apiUrl}/project`, {
                method: 'GET',
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status}`);
            }
            const data = await response.json();
            // ASSUMPTION: API response structure is { data: [...] }
            console.log(data)
            setProjects(data || []); 
        } catch (error: any) {
            console.error("Fetch Error:", error);
            toast.error("Error fetching projects", {
                description: error.message || "Could not load project data.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []); 
    
    // --- Action Handlers ---

    const handleDelete = (slug: string) => {
        
        toast.warning('Are you absolutely sure?', {
            description: `This action will permanently delete project ID: ${slug}.`,
            duration: Infinity, 
            closeButton: true,
            
            action: {
                label: 'Yes, Delete',
                onClick: async () => {
                    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
                    
                    // Optimistic update
                    setProjects(current => current.filter(p => p.slug !== slug));
                    
                    try {
                        const response = await fetch(`${apiUrl}/project/${slug}`, {  
                            method: 'DELETE',
                            credentials: 'include',
                        });
                        
                        if (!response.ok) {
                            throw new Error("Server failed to delete project.");
                        }
                        
                        toast.success("Project deleted successfully.");

                    } catch (error) {
                        console.error("Delete failed:", error);
                        // Optional: Re-fetch or revert the UI if deletion fails
                        fetchProjects(); 
                        toast.error("Deletion Failed", {
                            description: "Could not delete the project on the server. Data was reverted.",
                        });
                    }
                },
            },
            style: { backgroundColor: 'var(--red-600)', color: 'white' }
        });
    };

    const handleEdit = (slug: string) => {
        // Navigate to your dedicated edit page
        router.push(`/dashboard/project/edit/${slug}`);
    };

    // --- Rendering Logic ---

    if (loading) {
        return <div className="p-8 text-center">Loading projects...</div>;
    }

    if (projects.length === 0) {
        return <div className="p-8 text-center text-gray-500">No projects found.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Project Management Dashboard</h1>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">ID</TableHead>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Features</TableHead>
                            <TableHead className="w-[150px]">Live Site</TableHead>
                            <TableHead className="w-[150px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">#{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell className="hidden sm:table-cell text-sm text-gray-600">
                                    {project.features.join(', ').substring(0, 50)}...
                                </TableCell>
                                <TableCell>
                                    <a 
                                        href={project.livesite} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Site
                                    </a>
                                </TableCell>
                                <TableCell className="flex space-x-2 justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(project.slug)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(project.slug)}
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

export default ManageProject;