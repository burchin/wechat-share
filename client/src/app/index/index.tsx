import React from 'react';
import { render } from 'react-dom';

import Style from './style.scss';
import './style1.css';

class App extends React.Component {
    public render() {
        return <div className={Style.logo}>test</div>;
    }
}

render(<App />, document.getElementById('root'));
