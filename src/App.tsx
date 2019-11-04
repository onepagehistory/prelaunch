import React from 'react';
import { Root, Routes } from 'react-static';
import './App.scss';

function App() {
    return (
        <Root>
            <React.Suspense fallback={<em>Loading...</em>}>
                <Routes default path="*" />
            </React.Suspense>
        </Root>
    )
}

export default App