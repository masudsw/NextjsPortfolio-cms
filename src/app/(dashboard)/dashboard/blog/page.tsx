import React from 'react';

export const BlogPage = async() => {
     const data=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`)
    const project=await data.json()
    console.log(project)
    return (
        
        <div>
            <ul> 
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    project.map((pro:any) => {
                        return <li key={pro.id || pro.title}>{pro.title}</li>; // FIXED: Added 'return' and a 'key'
                    })
                }
            </ul>
        </div>
    );
    
};

export default BlogPage;