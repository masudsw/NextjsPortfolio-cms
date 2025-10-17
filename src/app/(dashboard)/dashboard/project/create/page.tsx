"use client"
import ProjectForm from '@/components/ui/project-form';
import React from 'react';

const CreateProject = () => {
    return (
        <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl  my-8'>
            <h1 className='text-2xl font-semibold mb-6 text-center'>Create Project Information</h1>
            <ProjectForm/>
        </div>
    );
};

export default CreateProject;