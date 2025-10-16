"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const blogSchema = z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    thumbnail: z.string().url("Must be a valid image URL").or(z.literal("")),
    isFeatured: z.boolean(),
    tags: z
        .string()
        .min(3, "Tags are required"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
interface BlogFormProps {
    defaultValues?: BlogFormValues;
    slug?: string;
    onSuccess?: () => void
}
const BlogForm = ({ defaultValues, slug, onSuccess }: BlogFormProps) => {
    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: defaultValues ? {
            ...defaultValues,
            tags: Array.isArray(defaultValues.tags) ? defaultValues.tags.join(',') : defaultValues.tags
        } : {
            title: "",
            content: "",
            thumbnail: "",
            tags: "",
            isFeatured: false
        },
    });

    // useEffect(() => {
    //     if (defaultValues) {
    //         const valuesWithFormattedTags = {
    //             ...defaultValues,
    //             tags: Array.isArray(defaultValues.tags) ? defaultValues.tags.join(',') : defaultValues.tags,
    //         };
    //         form.reset(valuesWithFormattedTags)
    //     }

    // }, [defaultValues, form.reset])
    const { isSubmitting } = form.formState;
    const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        const finalData = { ...data, tags: tagsArray }
        console.log("Final Data.......", finalData)
        const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (!apiUrl) {
            toast.error("BASE_URL environment variable is not set.");
            return;
        }
        try {
            const isEditing = !!slug;
            const method = isEditing ? 'PATCH' : 'POST';
            const url = isEditing ? `${apiUrl}/post/${slug}` : `${apiUrl}/post`;
            console.log("Submitting:", { method, url, data: finalData });
            const response = await fetch(url, {
                method,
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(finalData),
                credentials: 'include',
                cache: "no-store"
            });
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Operation failed: ${response.status}, ${errorData.message}`);
                return;
            }
            toast.success(`Blog post ${isEditing ? 'updated' : 'created'} successfully`);
            form.reset();
            onSuccess?.()

        } catch (error) {
            toast.error(`Network or fetch error : ${error}`)

        }

    }
    const isEditing = !!slug;
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Getting Started with HTML & CSS" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Content Field (Unchanged) */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Write your blog content here..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Thumbnail URL Field (Unchanged) */}
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Featured Post Switch (Unchanged) */}
                <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between border p-4 rounded-lg">
                            <FormLabel className="text-base font-medium">Featured Post?</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (Comma-separated)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., react, typescript, next.js, webdev"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    // 🔑 Disable the button during submission
                    disabled={isSubmitting}
                >
                    {/* 🔑 Change button text based on submission state */}
                    {isSubmitting
                        ? (isEditing ? "Updating post..." : "Creating post...")
                        : (isEditing ? "Update Blog Post" : "Submit Blog Post")
                    }
                </Button>
            </form>
        </Form>
    );
};

export default BlogForm;