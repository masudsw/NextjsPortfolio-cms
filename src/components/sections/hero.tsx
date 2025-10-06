import React from 'react';
import { WavyBackground } from '../ui/wavy-background';

const Hero = () => {
    return (
        <section id="home">
            <WavyBackground className='max-w-4xl mx-auto pb-60 pt-20'>
                <p className='text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center'>Welcome to my Portfolio</p>
                <p className='text-base md:text-lg mt-4 text-white font-normal text-center'>I am the web dev warrior! !!</p>
            </WavyBackground>
        </section>
    );
};

export default Hero;