import { hot } from 'react-hot-loader/root';
import React from 'react';

import { CustomApi } from './custom_api';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <CustomApi />
        </div>
    );
};

export default hot(App);
