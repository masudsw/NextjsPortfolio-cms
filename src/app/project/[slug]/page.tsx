// app/projects/[slug]/page.tsx (Server Component)

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectDetailPageProps {
    params: {
        slug: string; 
    };
}

async function fetchProjectDetail(slug: string): Promise<Project> {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL; 
        if (!apiUrl) {
        console.error("BASE_URL environment variable is not set.");
        notFound();
    }

    try {
        const response = await fetch(`${apiUrl}/project/${slug}`, { 
            cache: 'no-store' 
        });

        if (!response.ok) {
            if (response.status === 404) notFound(); 
            throw new Error(`Failed to fetch project: ${response.statusText}`);
        }

        const data = await response.json();
        return (data.data || data) as Project; 
    } catch (error) {
        console.error(`Error fetching project ${slug}:`, error);
        notFound(); 
    }
}


export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const { slug } = params;
    const project = await fetchProjectDetail(slug); 

    return (
        <div className="container mx-auto p-4 md:p-12 lg:p-20 bg-gray-50 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                {project.name}
            </h1>
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] mb-8 rounded-lg shadow-xl overflow-hidden">
                <Image 
                    src={project.thumbnail} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 80vw"
                    style={{ objectFit: 'cover' }}
                    priority 
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {project.description}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-8 ml-4">
                {project.features.map((feature, index) => (
                    <li key={index} className="pl-2">
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <Link 
                    href={project.livesite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg 
                               hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                    View Live Site
                </Link>
                <Link 
                    href={project.projectlink} // Assuming projectlink is the GitHub URL
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg 
                               hover:bg-gray-900 transition duration-300 shadow-md"
                >
                    View Code on GitHub
                </Link>
            </div>
        </div>
    );
}