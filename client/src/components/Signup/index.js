import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '../form/input';
import './index.scss';
import { text } from '@fortawesome/fontawesome-svg-core';

import User from '../../services/public/user';
const textField ={
  value:'',
  error:'',
};
class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:{...textField, name:'User Name', required:'true'} ,
      email:{...textField, name:'Email', required:'true'} ,
      password: {...textField, name:'Password', required:'true'},
      phone: {...textField , name: 'Phone'},
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({target}) => {
    let data = {...this.state};
    this.setState({ [target.name]: {...data[target.name], value: target.value }});
  }

  register =(e) => {
    e.preventDefault();
    const  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // const data = {...this.state};
    const data = {...this.state};
    let params ={};
    let isDataValid = true;
    let obj = Object.keys(data).map( (currentValue) => {
        params[currentValue] = data[currentValue].value;
      if(data[currentValue].required && data[currentValue].value ==='') {
        this.setState({ [currentValue]: { ...data[currentValue], value: '', error: `${data[currentValue].name} is required`}});
        isDataValid = false;
      }
      else{

          if(currentValue === 'email'){

              let emailCheck = emailRegex.test(data[currentValue].value);
              if(!emailCheck) {
                this.setState({ [currentValue]: {...data[currentValue], value: '', error: `${data[currentValue].name} is not valid`}});
                isDataValid = false;
              }

          }
      }
    });
    const response = isDataValid? User.register(params) : 'invalid data';


  }

  render() {

    return (
      <div className="signup">
        <h3>Sign up</h3>
        <div className="signup-form">
          <Input type ="text" icon={faUser} placeholder="User Name"  name="userName" data={this.state.userName} onChange={this.handleChange}  ></Input>
          <Input type ="email" icon={faEnvelope} placeholder="Email" name="email" data={this.state.email} onChange={this.handleChange} ></Input>
          <Input type="password" icon={faLock} placeholder="Password"  name="password" data={this.state.password} onChange={this.handleChange} ></Input>
          <Input type="text" icon = {faPhone} placeholder="Phone Number"  name="phone" data = {this.state.phone} onChange={this.handleChange}></Input>
          <button type="submit" className="signup-form-submit" onClick={this.register.bind(this)}> Register </button>
        </div>
      </div>
    );
  }
}


export default Signup;
