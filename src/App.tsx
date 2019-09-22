import React from 'react';
import { Root, Routes } from 'react-static';
import { Router } from '@reach/router';
import './App.scss';

function App() {
    return (
        <Root>
            <React.Suspense fallback={<em>Loading...</em>}>
                <Router>
                    <Routes path="*" />
                </Router>
            </React.Suspense>
        </Root>
    )
}

export default App
