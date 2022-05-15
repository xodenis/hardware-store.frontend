import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  let location = useLocation()

  const { isAuthenticated, loading } = useSelector((state) => state.authSlice)

  if (loading) {
    return (
      <Container>
        <h1>Проверяем авторизацию...</h1>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default PrivateRoute
