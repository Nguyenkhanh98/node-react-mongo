import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
          <div className="nav-signin">
           <FontAwesomeIcon icon={faUserCircle} className ="nav-signin-icon"/>
           <div>Sign in</div>
          </div>

        </nav>
      </header>

    );
  }
}

export default Header;
