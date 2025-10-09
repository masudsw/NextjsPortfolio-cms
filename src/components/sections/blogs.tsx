import React from 'react';

const Blogs = async() => {
    const data=await fetch(`process.env.DATABASE_URL/projects`)
    const project=await data.json()
    return (
        <div>
            {
                project.map((pro:any)=>{
                    <li>{pro.title}</li>
                })
            }
        </div>
    );
};

export default Blogs;