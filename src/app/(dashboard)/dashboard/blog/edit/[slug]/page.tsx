
import BlogForm, { BlogFormValues } from '@/components/ui/blog-form';

interface FetchedPost extends Omit<BlogFormValues, 'tags'> {
    tags: string[] | string;
    slug: string;
}

interface EditBlogProps {
    params: {
        slug: string;
    };
}

const fetchPostData = async (slug: string): Promise<FetchedPost> => {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const response = await fetch(`${apiUrl}/post/${slug}`, { method: 'GET', cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.status}`);
        }
        const responseJson = await response.json(); 
    
        if (responseJson.data) {
             return responseJson.data as FetchedPost; 
        } 
        
        return responseJson as FetchedPost; 

    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};

const EditBlog = async ({ params }: EditBlogProps) => {
    const {slug} = await params;
   const defaultData = await fetchPostData(slug);
     
    if (!defaultData) {
        return (
            <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl my-8 text-center'>
                <h1 className='text-2xl font-semibold mb-6 text-red-600'>Error</h1>
                <p>Could not load blog post with slug: **{slug}**</p>
            </div>
        );
    }

    const formDefaultValues: BlogFormValues = {
        ...defaultData,
        isFeatured: defaultData.isFeatured || false, 
        tags: Array.isArray(defaultData.tags) ? defaultData.tags.join(', ') : defaultData.tags,
    };


    return (
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl my-8'>
            <h1 className='text-2xl font-semibold mb-6 text-center'>Edit Blog Post: {formDefaultValues.title}</h1>
            <BlogForm
                defaultValues={formDefaultValues}
                slug={slug}
        
                // onSuccess={() => {
                //     // This onSuccess is a client-side function, so we can use toast/router here.
                //     // To refresh the manage page, you might call router.refresh() if the edit page is separate.
                // }}
                
            />
        </div>
    );
};

export default EditBlog;