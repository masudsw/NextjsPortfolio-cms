export interface Project {
    name: string;
    slug: string;        // Used for routing: /projects/[slug]
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