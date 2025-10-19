// src/components/ui/project-form.tsx

"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from 'next/navigation';
import { projectService } from '@/service/service';
// ---------------------------
// 🎯 ZOD SCHEMA DEFINITION
// ---------------------------
const projectSchema = z.object({
    name: z.string().min(5, "Project name is required and must be at least 5 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    // Features will be a comma-separated string in the form, like your tags
    features: z.string().min(3, "Features are required (comma-separated)."),

    projectlink: z.string()
        .url("Must be a valid URL for the repository.")
        .or(z.literal("")), // Allows empty string for optional field

    livesite: z.string()
        .url("Must be a valid URL for the live site.")
        .or(z.literal("")), // Allows empty string for optional field

    thumbnail: z.string()
        .url("Must be a valid image URL for the thumbnail.")
        .or(z.literal("")), // Allows empty string
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    defaultValues?: ProjectFormValues;
    // We'll use a unique identifier (like a slug or ID) for updates
    slug?: string;
    onSuccess?: () => void
}

const ProjectForm = ({ defaultValues, slug, onSuccess }: ProjectFormProps) => {

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        // Initialize form: use defaultValues for edit, or fallbacks for create
        defaultValues: defaultValues ? {
            ...defaultValues,
            // Ensure the features array (if returned from API) is joined to a string for the input
            features: Array.isArray(defaultValues.features) ? defaultValues.features.join(', ') : defaultValues.features
        } : {
            name: "",
            description: "",
            features: "",
            projectlink: "",
            livesite: "",
            thumbnail: "",
        },
    });
    const router = useRouter();

    const { isSubmitting } = form.formState;

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        // Prepare data for API: Convert features string back into an array
        const featuresArray = data.features.split(',').map(f => f.trim()).filter(f => f.length > 0)
        const finalData = { ...data, features: featuresArray }



        try {
            if (isEditing) {
                await projectService.updateProject(slug as string, finalData);
            }
            else {
                await projectService.createProject(finalData);
            }


            toast.success(`Project ${isEditing ? 'updated' : 'created'} successfully`);
            form.reset();
            router.push('/dashboard/project/manage');
            onSuccess?.()

        } catch (error) {
            console.error(error);
            toast.error(`Network or fetch error: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    const isEditing = !!slug;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="E-commerce Website Redesign" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Detailed Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="A comprehensive overhaul focusing on mobile responsiveness..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Features Field (Comma-separated) */}
                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Key Features (Comma-separated)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Responsive Design, Stripe Integration, User Auth"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Project Link (GitHub/Repo) Field */}
                <FormField
                    control={form.control}
                    name="projectlink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repository Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/my-project" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Live Site Link Field */}
                <FormField
                    control={form.control}
                    name="livesite"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Live Site URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://www.example-livesite.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Thumbnail Field */}
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="/images/my-project-thumb.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? (isEditing ? "Updating Project..." : "Creating Project...")
                        : (isEditing ? "Update Project" : "Create Project")
                    }
                </Button>
            </form>
        </Form>
    );
};

export default ProjectForm;