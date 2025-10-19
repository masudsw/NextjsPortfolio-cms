
export interface ApiResponse<T> {
    data: T[]; 
}

// Define the structure of the Author object
interface Author {
    id: number;
    name: string; 
    email: string;
   
}

export interface BlogPost{
    title:string;
    slug?:string;
    content:string;
    thumbnail:string;
    isFeatured:boolean;
    tags:string[];
    views?: number; 
    authorId?: number;
    createdAt?: string;
    updatedAt?: string;
    author?: Author; 
}
export interface Project {
    name: string;
    slug?: string;        // Used for routing: /projects/[slug]
    description: string;
    features: string[];
    thumbnail: string;   // Used for the image source
    projectlink: string; // The GitHub URL (I'll assume 'projectlink' is the GitHub link)
    livesite: string;
}

export interface ProjectListProps {
    projects: Project[];
}

export interface ApiProject {
    name: string;
    slug: string;
    thumbnail: string;
    // ... other fields are not needed for the ParallaxScroll component
}

// Define the ParallaxScroll component's expected interface
export interface ParallaxItem {
    image: string; // Maps to ApiProject.thumbnail
    link: string;  // Maps to /projects/ + ApiProject.slug
}