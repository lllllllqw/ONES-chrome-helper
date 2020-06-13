import { hot } from 'react-hot-loader/root';
import React from 'react';

import './App.scss';
import { BranchSetting } from './components/branch_setting';

const App = () => {
    return (
        <div className="app">
            <BranchSetting />
        </div>
    );
};

export default hot(App);
