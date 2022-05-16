import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import { logout } from '../../../app/authSlice'
import { store } from '../../../app/store'

import './profile.scss'

export const Profile = () => {
  const handleClickLogout = () => {
    store.dispatch(logout())
  }

  return (
    <Container className="main-container">
      <h1 className="profile-title">Личный кабинет</h1>
      <Row className="profile">
        <Col xs={3} className="profile-navigation">
          <Navbar>
            <Nav className="me-auto">
              <NavLink className="navbar-nav-link" to="/profile/info">
                <FontAwesomeIcon
                  className="navbar-nav-icon"
                  icon="fa-regular fa-user"
                />
                Мой профиль
              </NavLink>
              <NavLink className="navbar-nav-link" to="/profile/orders">
                <FontAwesomeIcon
                  className="navbar-nav-icon"
                  icon="fa-solid fa-list"
                />
                Заказы
              </NavLink>
              <NavLink className="navbar-nav-link" to="/favorites">
                <FontAwesomeIcon
                  className="navbar-nav-icon"
                  icon="fa-regular fa-heart"
                />
                Избранное
              </NavLink>
              <NavLink className="navbar-nav-link" to="/profile/settings">
                <FontAwesomeIcon
                  className="navbar-nav-icon"
                  icon="fa-regular fa-pen-to-square"
                />
                Настройки профиля
              </NavLink>
              <button
                className="profile-navigation-logout"
                onClick={handleClickLogout}>
                <FontAwesomeIcon
                  className="navbar-nav-icon"
                  icon="fa-solid fa-arrow-right-from-bracket"
                />
                Выйти
              </button>
            </Nav>
          </Navbar>
        </Col>
        <Col xs={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}
