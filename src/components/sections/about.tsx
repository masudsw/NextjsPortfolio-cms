import React from 'react';
import { TextGenerateEffect } from '../ui/text-generate-effect';
const words = `
I am a passionate web developer who loves turning ideas into interactive web experiences.

I specialize in building responsive and dynamic applications using React, TypeScript, and TailwindCSS.

I enjoy crafting clean and efficient code that is both scalable and user-friendly.

My projects range from event management platforms to micro-task outsourcing systems.

I have strong problem-solving skills and a collaborative mindset that help me deliver impactful solutions.

I am always eager to learn new technologies and improve my development skills.

My goal is to create digital solutions that are intuitive, engaging, and make a real difference.
`
const About = () => {
    return (
        <section id="about"
            className='bg-black flex flex-col justify-center items-center px-10 md:px-40 text-white'
        >
            <h2 className='text-white text-4xl font-bold'>About Me</h2>
           
            <div className="h-[20rem] w-full bg-black bg-grid-small-white/[0.2] relative flex items-center justify-center text-white">
                {/* Radial gradient for the container to give a faded look */} 
                 <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> 
                <div>
                <TextGenerateEffect words={words}  />
                </div>
            </div>
        </section>
    );
};

export default About;