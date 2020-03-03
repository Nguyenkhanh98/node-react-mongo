import React from 'react';
import Game from './components/Game';
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info){
    this.setState({ hasError:true });
  }
  componentWillMount(){ // call before render only first time

  }
  componentDidMount(){

  }


  componentWillMount(){
  }
  //first time before render
  componentWillReceiveProps(){

  }

  // Before render and after will receve props() ,
  shouldComponentUpdate(){

    // Return true or false, if false all updating cycle method will not be called
  }
  componentWillUpdate(){

  }
  componentDidUpdate(){

  }

  componentWillUnmount(){

  }
  render(){

    return (
      <Game/>
    );
  }
};

export default App;
