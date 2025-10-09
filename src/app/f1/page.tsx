import Link from 'next/link';
import React from 'react';

const F1 = () => {
    return (
        <div>
            <p>page f1</p>
            <br></br>
            <Link href="/f1/f2">F2</Link>
            <br></br>
            <Link href={"/f3"}>F3</Link>
        </div>
    );
};

export default F1;