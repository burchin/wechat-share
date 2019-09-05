import React from 'react';
import { render } from 'react-dom';

import Style from './style.scss';

class App extends React.Component {
  render() {
    return (<div className={Style.box}>test</div>);
  }
}

render(<App />, document.getElementById('root'));
