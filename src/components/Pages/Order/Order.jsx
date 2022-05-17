import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import './order.scss'

export const Order = () => {
  return (
    <Container className="main-container">
      <div className="order">
        <Outlet />
      </div>
    </Container>
  )
}
