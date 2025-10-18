"use client";
import { toast } from "sonner";


export default async function Projects() {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!apiUrl) {
        toast.error("BASE_URL environment variable is not set.");
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

    } catch (error: any) {
        console.error("Fetch Error:", error);
        toast.error("Error fetching projects", {
            description: error.message || "Could not load project data.",
        });
    }

    return (
        <section
            id="project"
            className="bg-black flex flex-col justify-center items-center gap-10 p-10"
        >
            <h2 className="text-white text-4xl font-bold">Projects</h2>
            {/* <ParallaxScroll projects={projects} /> */}
        </section>
    );
}

