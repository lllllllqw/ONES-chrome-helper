import { hot } from 'react-hot-loader/root';
import React from 'react';

import './App.scss';
import { CustomApi } from './components/custom_api';

const App = () => {
    return (
        <div className="app">
            <CustomApi />
        </div>
    );
};

export default hot(App);
