import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './index.scss';

class Input extends React.PureComponent {
  render() {
    const {
      className, icon, label, type, placeholder, onChange, right, name, inputStyle, siblingStyle,
    } = this.props;
    const { data } = this.props;
    return (
      <div className="input">
        {icon ? (<FontAwesomeIcon style={siblingStyle} icon={icon} />) : (
          <label style={siblingStyle}>
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={data.value}
          onChange={onChange}
          style={inputStyle}

        />
        {right ? (
          <label style={siblingStyle}>
            {label}
          </label>
        ) : ''}

      </div>
    );
  }
}

Input.defaultProps = {

  data: '',
  className: '',
  onChange: '',
  icon: '',
  label: '',
  right: '',
  inputStyle: { width: '70%' },
  siblingStyle: { width: '20%' },
  name: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  inputStyle: PropTypes.object,
  siblingStyle: PropTypes.object,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.object,
  label: PropTypes.string,
  right: PropTypes.any,
};
export default Input;
