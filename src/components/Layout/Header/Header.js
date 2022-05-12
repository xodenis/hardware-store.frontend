import { NavLink } from 'react-router-dom'
import { Col, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CategoriesPopup } from '../../Categories'
import logo from '../../assets/img/logo.svg'

import './header.scss'
import { useState } from 'react'

const Header = () => {
  const [showCategoryPopup, setShowCategoryPopup] = useState(false)

  const handleCatalogClick = () => setShowCategoryPopup(!showCategoryPopup)

  return (
    <header className="header">
      <div className="header-info">
        <Navbar as={Container}>
          <Col xs={3} as={Navbar.Brand} href="/">
            <img className="header-logo" src={logo} alt="Логотип" />
          </Col>
          <Col xs={8} as={Nav}>
            <NavLink className="navbar-nav-link" to="/contacts">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-solid fa-phone"
              />
              Контакты
            </NavLink>
            <NavLink className="navbar-nav-link" to="/delivery">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-solid fa-truck"
              />
              Доставка
            </NavLink>
            <NavLink className="navbar-nav-link" to="/address">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-solid fa-location-dot"
              />
              Адреса магазинов
            </NavLink>
            <Nav.Item bsPrefix="navbar-nav-item">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-regular fa-clock"
              />
              <span>
                Режим работы:
                <br />
                пн-сб с 6:00 до 22:00
              </span>
            </Nav.Item>
          </Col>
        </Navbar>
      </div>
      <div className="header-controls">
        <Container>
          <Col xs={2}>
            <div className="catalog" onClick={() => handleCatalogClick()}>
              <div className="catalog-button">
                <FontAwesomeIcon
                  className="catalog-button-icon"
                  icon="fa-solid fa-bars"
                />
              </div>
              <div className="catalog-text">Каталог товаров</div>
              <CategoriesPopup isOpen={showCategoryPopup} />
            </div>
          </Col>

          <Col xs={4}>
            <div className="search">
              <Form.Control
                type="text"
                placeholder="Поиск товаров"
                className="search-input"
              />
              <FontAwesomeIcon
                className="search-icon"
                icon="fa-solid fa-magnifying-glass"
              />
            </div>
          </Col>
          <Col xs={5} as={Nav}>
            <NavLink className="navbar-nav-link" to="/favorites">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-regular fa-heart"
              />
              Избранное
            </NavLink>
            <NavLink className="navbar-nav-link" to="/profile">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-regular fa-user"
              />
              Личный кабинет
            </NavLink>
            <NavLink className="navbar-nav-link" to="/cart">
              <FontAwesomeIcon
                className="navbar-nav-icon"
                icon="fa-solid fa-cart-shopping"
              />
              Корзина
            </NavLink>
          </Col>
        </Container>
      </div>
    </header>
  )
}

export default Header
