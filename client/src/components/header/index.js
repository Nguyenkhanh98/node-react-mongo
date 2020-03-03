import React from 'react';
import {
  AppBar, Toolbar, Typography, withTheme, Button,
} from '@material-ui/core';
import './index.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <header className="header">
        <nav className="nav">

          <h2>Personal</h2>
          <button type="button">Sign in</button>
        </nav>
      </header>

    );
  }
}

export default Header;
