import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';
class Signup extends React.PureComponent {

  render() {
    return (
      <div class="signup">
          <h3>Sign up</h3>
          <div>
            <div>
              <input type = "text"> </input>
              <FontAwesomeIcon icon = {faUser}/>
            </div>
          </div>

      </div>
    );
  }
}

export default Signup;
