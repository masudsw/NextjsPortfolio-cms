import ProjectForm from '@/components/ui/project-form';
import React from 'react';
import { notFound, redirect } from 'next/navigation';

// Define the expected shape of the fetched project data
interface FetchedProject {
    slug: string;
    name: string;
    description: string;
    features: string[]; // Assuming the API returns an array for features
    projectlink: string;
    livesite: string;
    thumbnail: string;
}

interface EditProjectProps {
    params: {
        slug: string; // Dynamic route segment is always a string
    };
}

const fetchProjectData = async (slug: string): Promise<FetchedProject> => {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!apiUrl) {
        throw new Error("BASE_URL environment variable is not set.");
    }

    try {
        const response = await fetch(`${apiUrl}/project/${slug}`, {
            method: 'GET',
            cache: 'no-store',
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch project: ${response.status}`);
        }

        const responseJson = await response.json();
        // ASSUMPTION: Post data is nested under a 'data' property
        const projectData = responseJson; 

        if (!projectData) {
            notFound();
        }

        return projectData as FetchedProject;

    } catch (error) {
        // If the fetch fails or status is 404
        console.error("Fetch Error:", error);
        notFound(); 
    }
};

const EditProjectPage = async ({ params }: EditProjectProps) => {
    const {slug} = await params;

    // Fetch the existing data on the server
    const defaultData = await fetchProjectData(slug);
    
    // Format the fetched data for the form (ProjectForm expects ProjectFormValues type)
    const formInitialValues = {
        ...defaultData,
        // Convert the features array back to a comma-separated string for the form input
        features: Array.isArray(defaultData.features) ? defaultData.features.join(', ') : defaultData.features,
    }

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl my-8'>
            <h1 className='text-2xl font-semibold mb-6 text-center'>Edit Project: {defaultData.name}</h1>
            <ProjectForm 
                defaultValues={formInitialValues} 
                slug={defaultData.slug}   
            />
        </div>
    );
};

export default EditProjectPage;