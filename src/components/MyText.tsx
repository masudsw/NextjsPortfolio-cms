import React from 'react';
import { TextGenerateEffect } from './ui/text-generate-effect';
const words='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet porro tempore debitis iusto architecto possimus officia ipsa obcaecati hic, laboriosam nesciunt dolorum, vel optio iure magnam! Doloribus quisquam obcaecati suscipit.'
const MyText = () => {
    return (
        <div>
            <TextGenerateEffect words={words} />
        </div>
    );
};

export default MyText;