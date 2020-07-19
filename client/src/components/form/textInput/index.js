import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import './index.scss'

class Input extends React.PureComponent {
  render () {
    const {
      className, icon, label, type, placeholder, onChange, right, name, inputStyle, siblingStyle
    } = this.props
    const { data } = this.props
    return (
      <div className="input">

        <input
          type={type}
          placeholder={data.error ? data.error : placeholder}
          name={name}
          value={data.value}
          onChange={onChange}
          style={(data.error && data.value === '') ? { border: '1px solid #e03c3c' } : null}
        />
        {icon ? (<FontAwesomeIcon style={siblingStyle} icon={icon} />) : null}
      </div>
    )
  }
}

Input.defaultProps = {

  data: '',
  className: '',
  onChange: '',
  icon: '',
  label: '',
  right: '',
  name: ''
}

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
  right: PropTypes.any
}
export default Input
