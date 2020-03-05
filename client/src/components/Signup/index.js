import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '../form/input';
import './index.scss';
const textField ={
  value:'',
  error:'',
};

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:{...textField} , email: {...textField}, password: {...textField}, phone: {...textField},
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]: {...textField, value: target.value }});
  }

  register(e) {
    const  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const data = {...this.state};
    const data = (...this.state);



    console.log(data);

    console.log(this.state);
    e.preventDefault();

  }

  render() {

    return (
      <div className="signup">
        <h3>Sign up</h3>
        <div className="signup-form">
          <Input type ="text" icon={faUser} placeholder="User Name"  name="userName" data={this.state.userName} onChange={this.handleChange}  ></Input>
          <Input type ="email" icon={faEnvelope} placeholder="Email" name="email" data={this.state.email} onChange={this.handleChange} ></Input>
          <Input type="text" icon={faLock} placeholder="Password"  name="password" data={this.state.password} onChange={this.handleChange} ></Input>
          <Input type="text" icon = {faPhone} placeholder="Phone Number"  name="phone" data = {this.state.phone} onChange={this.handleChange}></Input>
          <button type="submit" className="signup-form-submit" onClick={this.register.bind(this)}> Register </button>
        </div>
      </div>
    );
  }
}


export default Signup;
