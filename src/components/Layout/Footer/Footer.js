import { NavLink } from 'react-router-dom'
import { Col, Container, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/img/logo.svg'

import './footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <Navbar as={Container}>
        <Col xs={2} className={'footer-about'}>
          <h2 className="footer-about-title">О нас</h2>
          <NavLink className="navbar-nav-link" to="/contacts">
            Контакты
          </NavLink>
          <NavLink className="navbar-nav-link" to="/address">
            Адреса магазинов
          </NavLink>
        </Col>
        <Col xs={{ span: 2, offset: 1 }} className={'footer-buyers'}>
          <h2 className="footer-buyers-title">Покупателям</h2>
          <NavLink className="navbar-nav-link" to="/payment-info">
            Оплата
          </NavLink>
          <NavLink className="navbar-nav-link" to="/delivery">
            Доставка
          </NavLink>
        </Col>
        <Col xs={{ span: 3, offset: 4 }} as={Navbar.Brand} href="/">
          <img className="header-logo" src={logo} alt="Логотип" />
        </Col>
      </Navbar>
    </footer>
  )
}

export default Footer
