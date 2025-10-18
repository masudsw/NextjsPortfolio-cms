
import { ParallaxItem } from "@/types";
import { ProjectParallaxSection } from "../ui/projectParallax";
import fetchAllProjects from "@/helper/fetchProjectData";

export default async function ProjectsPage() {
    
    const rawProjects = await fetchAllProjects();

    // 3. Map the raw data to the ParallaxScroll format (image and link)
    const parallaxProjects: ParallaxItem[] = rawProjects.map(project => ({
        image: project.thumbnail,
        link: `/project/${project.slug}`, // Link to the detail page
    }));

    if (parallaxProjects.length === 0) {
        return <div className="p-10 text-center text-white bg-black">No projects to display.</div>;
    }

    // 4. Pass the transformed data to the Client Component
    return <ProjectParallaxSection projects={parallaxProjects}  sectionId="projects-section" />;
}