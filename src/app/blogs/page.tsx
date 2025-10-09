import React from 'react';

export const BlogPage = async() => {
     const data=await fetch(`${process.env.DATABASE_URL}/projects`)
    const project=await data.json()
    console.log(project)
    return (
        
        <div>
            <ul> 
                {
                    project.map((pro:any) => {
                        return <li key={pro.id || pro.title}>{pro.title}</li>; // FIXED: Added 'return' and a 'key'
                    })
                }
            </ul>
        </div>
    );
    
};

export default BlogPage;