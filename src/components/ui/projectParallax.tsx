"use client";

import { ParallaxItem } from "@/types";
import { ParallaxScroll } from "../ui/parallax-scroll"; 


interface ProjectParallaxSectionProps {
    projects: ParallaxItem[];
    sectionId: string;
}

export function ProjectParallaxSection({ projects, sectionId }: ProjectParallaxSectionProps) {
    return (
        <section
            id={sectionId} 
            className="bg-black flex flex-col justify-center items-center gap-10 p-10 w-full"
        >
            <h2 className="text-white text-4xl font-bold">Projects</h2>
            <ParallaxScroll projects={projects} />
        </section>
    );
}