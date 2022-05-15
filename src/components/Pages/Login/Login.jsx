import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../../Input'

import './login.scss'
import { Container } from 'react-bootstrap'
import { login } from '../../../services/auth'
import { Navigate, useLocation } from 'react-router-dom'

const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const initialValues = { username: '', password: '' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const { isAuthenticated } = useSelector((state) => state.authSlice)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }

  const validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Поле Имя пользователя должно быть заполнено.'
    }
    if (!values.password) {
      errors.password = 'Поле Пароль должно быть заполнено.'
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(login(formValues))
    }
  }, [formErrors])

  if (isAuthenticated)
    return <Navigate to="/profile" state={{ from: location }} />

  return (
    <Container className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form-title">Вход в личный кабинет</h2>
        <div className="login-form-wrapper">
          <Input
            name="username"
            type="text"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            value={formValues.username}
            onChange={handleChange}
            error={formErrors.username && formErrors.username}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={formValues.password}
            onChange={handleChange}
            error={formErrors.password && formErrors.password}
          />
        </div>
        <button type="submit" className="login-form-button">
          Войти
        </button>
      </form>
    </Container>
  )
}

export default Login
