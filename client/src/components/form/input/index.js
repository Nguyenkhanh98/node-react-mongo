import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.scss';

class Input extends React.PureComponent {
  render() {
    console.log(this.props);
    const {
      className, icon, label, type, placeholder, value, onChange, right, name,
    } = this.props;
    return (
      <div className={className}>
        {icon ? (<FontAwesomeIcon icon={icon} />) : (
          <label>
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {right ? (
          <label>
            {label}
          </label>
        ) : ''}
      </div>
    );
  }
}

Input.defaultProps = {

  value: '',
  className: '',
  onChange: '',
  icon: '',
  label: '',
  right: '',
  name: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.object,
  label: PropTypes.string,
  right: PropTypes.any,
};
export default Input;
