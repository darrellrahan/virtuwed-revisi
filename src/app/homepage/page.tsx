'use client'
import { useState } from 'react';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState('home');

    const pantai = () => {
        setCurrentPage('pantai');
    };

    const gunung = () => {
        setCurrentPage('gunung');
    };

    let pageContent;

    if (currentPage === 'pantai') {
        pageContent = <h1>INI PANTAI</h1>;
    } else if (currentPage === 'gunung') {
        pageContent = <h1>GUNUNG</h1>;
    }

    return (
        <div>
            {pageContent}


            <div className='grid grid-flow-row'>
                <button onClick={pantai}>Go to pantai</button>
                <button onClick={gunung}>Go to gunung</button>
            </div>
        </div>
    );
};

export default HomePage;