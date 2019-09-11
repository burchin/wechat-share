import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  public render() {
    return (
      <div>
        <input type="button" value="分享" />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
