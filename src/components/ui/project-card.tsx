// components/ProjectList.tsx
"use client";

import { ProjectListProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
// Assuming Project and ProjectListProps interfaces are defined above

export function ProjectCard({ projects }: ProjectListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {projects.map((project) => (
                // Wrap the entire card in the Next.js Link component
                <Link 
                    key={project.slug} 
                    href={`/project/${project.slug}`} // Dynamically links to the detail page
                    className="block bg-white shadow-lg rounded-xl overflow-hidden group 
                               hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                >
                    {/* Project Thumbnail */}
                    <div className="relative h-60 w-full">
                        <Image 
                            src={project.thumbnail} 
                            alt={project.name} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="transition duration-500 group-hover:scale-105"
                        />
                    </div>
                    
                    {/* Project Title */}
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">
                            {project.name}
                        </h2>
                        {/* The description, features, projectlink, and livesite are now shown on the detail page */}
                    </div>
                </Link>
            ))}
        </div>
    );
}