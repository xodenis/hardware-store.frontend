import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { getCart } from '../../../services/cart'
import { Col, Container, Row } from 'react-bootstrap'
import ProductCard from '../../ProductCard/ProductCard'

import './cart.scss'
import { Oval } from 'react-loader-spinner'

export const Cart = () => {
  const { loading, cart } = useSelector((state) => state.cartSlice)

  useEffect(() => {
    store.dispatch(getCart())
  }, [])

  return (
    <Container className="main-container">
      <h1 className="cart-title">Корзина</h1>
      {loading ? (
        <div className="loader" style={{ height: '100%' }}>
          <Oval />
        </div>
      ) : cart.products?.length === 0 ? (
        <h2 className="cart-title-empty">Ваша корзина пустая :с</h2>
      ) : (
        <Row className="cart">
          <Col xs={9} className="cart-list">
            {cart.products?.map((item) => (
              <ProductCard
                className="cart-list-item"
                key={item.product.id}
                product={item.product}
                initialCount={item.count}
                cartMode
              />
            ))}
          </Col>
          <Col xs={3} className="cart-controls"></Col>
        </Row>
      )}
    </Container>
  )
}
