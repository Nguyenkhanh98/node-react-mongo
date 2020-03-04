import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import Input from '../form/input';
import './index.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '', email: '', password: '', phone: '',
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]: target.value });
  }

  register(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="signup">
        <h3>Sign up</h3>
        <div className="signup-form">
          <div className="signup-form-input">
            <FontAwesomeIcon icon={faUser} />
            <input type="text" placeholder="User name" name="userName" value={this.state.userName} onChange={this.handleChange} />
          </div>
          <div className="signup-form-input">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required/>

          </div>
          <div className="signup-form-input">
            <FontAwesomeIcon icon={faLock} />
            <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <Input className="signup-form-input" type="text" icon = {faLock}  name="phone" value = {this.state.phone} onChange={this.handleChange}></Input>
          <button type="submit" className="signup-form-submit" onClick={this.register.bind(this)}> Register </button>
        </div>

      </div>
    );
  }
}


export default Signup;
