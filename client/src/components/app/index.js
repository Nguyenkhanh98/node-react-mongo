import React from 'react';
import Header from '../header';
import Signup from '../signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  componentWillMount() { // call before render only first time

  }

  componentDidMount() {

  }


  // first time before render
  componentWillReceiveProps() {

  }

  // Before render and after will receve props() ,
  shouldComponentUpdate() {

    // Return true or false, if false all updating cycle method will not be called
  }

  componentWillUpdate() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Signup />
        </main>
      </div>
    );
  }
}

export default App;
