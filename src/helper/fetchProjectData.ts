import { ApiProject } from "@/types";

// 1. Server-Side Data Fetching (Use your existing fetch function)
export default async function fetchAllProjects(): Promise<ApiProject[]> {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // Safety check and fetch logic (as shown in previous answers)
    try {
        const response = await fetch(`${apiUrl}/project`, { cache: 'no-store' });
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        return (data.data || data) as ApiProject[]; // Adjust for your API response structure
    } catch (error) {
        console.error("Project Fetch Error:", error);
        return [];
    }
}
