import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './input.scss'

const Input = ({
  className = '',
  name = '',
  label = '',
  type = 'text',
  placeholder = '',
  value = '',
  readonly = '',
  error = '',
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const showPasswordClick = () => setShowPassword(!showPassword)

  return (
    <div className={`input ${className}`}>
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          className={
            readonly === 'default'
              ? 'readonly'
              : readonly && readonly === 'gray'
              ? 'readonly-gray'
              : ''
          }
          name={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readonly ? true : false}
        />
        {type === 'password' && (
          <button
            title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            type="button"
            className="input-show"
            onClick={showPasswordClick}>
            <FontAwesomeIcon
              icon={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
            />
          </button>
        )}
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}

export default Input
