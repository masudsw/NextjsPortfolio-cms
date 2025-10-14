// "use client";

// import { useState, useCallback } from "react"; // <-- NEEDED for Tag Input logic
// import { useForm, useFieldArray, SubmitHandler,FieldPath } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { X } from "lucide-react"; // <-- NEEDED for the tag delete icon

// // --- Assuming these components are correctly imported from your UI library ---
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// // ----------------------
// // 1️⃣ Zod schema
// // ----------------------
// const blogSchema = z.object({
//   title: z.string().min(3, "Title is required"),
//   content: z.string().min(10, "Content must be at least 10 characters"),
//   thumbnail: z.string().url("Must be a valid image URL").or(z.literal("")), 
//   isFeatured: z.boolean(),
//   tags: z
//     .array(z.string().min(1, "Tag cannot be empty"))
//     .min(1, "At least one tag is required"),
// });

// export type BlogFormValues = z.infer<typeof blogSchema>;

// export default function BlogForm() {
//   const form = useForm<BlogFormValues>({
//     resolver: zodResolver(blogSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//       thumbnail: "",
//       isFeatured: false,
//       tags: [""], 
//     },
//   });

//   const [inputValue, setInputValue] = useState("");
  
  
// const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "tags", 
// }) as any; 



//   const onSubmit: SubmitHandler<BlogFormValues> = (data) => {
//     console.log("Submitted Blog:", data);
    
//   };

 
//   const removeTag = useCallback((index: number) => {
//     remove(index);
//   }, [remove]);

 
//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       // Check for Space, Enter, or Comma key
//       if (e.key === " " || e.key === "Enter" || e.key === ",") {
//         e.preventDefault();
//         const newTag = inputValue.trim();
        
//         if (newTag && newTag !== ",") {
//             // Check for duplicates before appending
//             const currentTags = form.getValues('tags');
//             if (!currentTags.includes(newTag)) {
//                 append(newTag); // Add tag to react-hook-form state
//             }
//           setInputValue(""); // Clear the local input state
//         }
//       }
//     },
//     [inputValue, append, form]
//   );
  

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Create Blog Post</h2>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//           {/* Title Field */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Getting Started with HTML & CSS" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Content Field (Textarea) */}
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Content</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your blog content here..."
//                     className="min-h-[120px]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Thumbnail URL Field */}
//           <FormField
//             control={form.control}
//             name="thumbnail"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Thumbnail URL (Optional)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="https://example.com/image.png" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Featured Post Switch */}
//           <FormField
//             control={form.control}
//             name="isFeatured"
//             render={({ field }) => (
//               <FormItem className="flex items-center justify-between border p-4 rounded-lg">
//                 <FormLabel className="text-base font-medium">Featured Post?</FormLabel>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* --- Tags Field Array (Tag Input) --- */}
//           <FormField
//             control={form.control}
//             name="tags" 
//             render={() => (
//               <FormItem>
//                 <FormLabel>Tags (Press Space, Enter, or Comma to add)</FormLabel>
//                 <div className="border rounded-md min-h-[44px] p-2 flex flex-wrap items-center gap-2">
                  
//                   {/* 1. Render all existing tags as boxes */}
//                   {fields.map((tagField, index) => {
//                     // Get the string value from the RHF state to display
//                     const tagValue = form.getValues(`tags.${index}`);
                    
//                     return (
//                         <div
//                             key={tagField.id}
//                             className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full border border-gray-300"
//                         >
//                             {tagValue} 
//                             <X
//                                 className="ml-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
//                                 onClick={() => removeTag(index)}
//                             />
//                         </div>
//                     );
//                   })}
                  
//                   {/* 2. The dynamic input field */}
//                   <Input
//                     className="flex-1 min-w-[100px] border-none shadow-none focus-visible:ring-0"
//                     placeholder={fields.length === 0 ? "Add your first tag..." : ""}
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                   />
//                 </div>
//                 {/* 3. Display array-level validation errors */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Submit Button */}
//           <Button type="submit" className="w-full">
//             Submit Blog Post
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// X and related logic are no longer needed
// import { X } from "lucide-react"; 

// --- Assuming these components are correctly imported from your UI library ---
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

// ----------------------
// 1️⃣ Zod schema (SIMPLIFIED)
// ----------------------
// The tags field is now a single string that will hold the comma-separated sentence.
const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Must be a valid image URL").or(z.literal("")),
  isFeatured: z.boolean(),
  // 🔑 CHANGE: tags is now a single string, not an array.
  tags: z
    .string()
    .min(3, "Tags are required"), // Simple string validation
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      isFeatured: false,
      tags: "", // Initialize as an empty string
    },
  });

  // 🗑️ Removed: useState (inputValue) and useFieldArray are no longer needed.
  // 🗑️ Removed: removeTag and handleKeyDown are no longer needed.


  // 🔑 Submission Logic: Splits the tags string into an array before use.
  const onSubmit: SubmitHandler<BlogFormValues> = (data) => {
    // Convert the single string into an array of trimmed tags
    const tagsArray = data.tags
      .split(',') // Split by comma
      .map(tag => tag.trim()) // Remove leading/trailing whitespace
      .filter(tag => tag.length > 0); // Remove any empty strings resulting from multiple commas

    const finalData = {
      ...data,
      tags: tagsArray, // Replace the string with the clean array
    };
    
    console.log("Submitted Blog (Ready for Server):", finalData);
    // Now you can call your API with finalData
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Blog Post</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Title Field (Unchanged) */}
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

          {/* 🔑 SIMPLIFIED TAGS INPUT */}
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
          <Button type="submit" className="w-full">
            Submit Blog Post
          </Button>
        </form>
      </Form>
    </div>
  );
}