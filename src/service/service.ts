import { BlogPost, Project } from '@/types';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set.");
}


async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}/${endpoint}`;

    try {
        const response = await fetch(url, {
            cache: 'no-store', 
            ...options,
        });

        if (!response.ok) {
            if (response.status === 404) {
                notFound();
            }
            throw new Error(`API call failed with status: ${response.status} for ${url}`);
        }

        return response.json() as Promise<T>;

    } catch (error) {
        console.error(`Fetch Error on ${url}:`, error);
        throw new Error("A network or server error occurred.");
    }
}

export const projectService = {
    createProject: (data: Project) => apiFetch<Project>('project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    updateProject: (id: string, data: Partial<Project>) => apiFetch<Project>(`project/${id}`, {
        method: 'PATCH', // or 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    getProjectBySlug: (slug: string) => apiFetch<Project>(`project/${slug}`),
    getAllProjects: () => apiFetch<Project[]>('project'),
};

export const blogService = {
      createPost: (data: BlogPost) => apiFetch<BlogPost>('post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    updatePost: (postId: string, data: Partial<BlogPost>) => apiFetch<BlogPost>(`post/${postId}`, {
        method: 'PUT', // or 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
    getLatestPosts: () => apiFetch<BlogPost[]>('post?limit=3'),
    getPostBySlug:(slug:string)=>apiFetch<BlogPost>(`post/${slug}`),
    getAllPosts:()=>apiFetch<BlogPost[]>('post')
};