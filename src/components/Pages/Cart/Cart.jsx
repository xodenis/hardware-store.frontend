import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { getCart, removeAllProducts } from '../../../services/cart'
import { Col, Container, Row } from 'react-bootstrap'
import ProductCard from '../../ProductCard/ProductCard'

import './cart.scss'
import { Oval } from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Cart = () => {
  const { loading, cart } = useSelector((state) => state.cartSlice)

  const [selectedItems, setSelectedItems] = useState([])

  const handleSelect = (productId, count) => {
    setSelectedItems([...selectedItems, { productId: productId, count: count }])
  }

  const handleUnselect = (productId) => {
    setSelectedItems(
      selectedItems.filter((item) => item.productId !== productId),
    )
  }

  const countPrice = () => {
    let price = 0

    selectedItems.forEach((item) => {
      const productInfo = cart.products.find(
        (elem) => elem.product.id === item.productId,
      )

      price = price + productInfo.product.price * item.count
    })

    return price
  }

  const handleClickCheckout = () => {
    sessionStorage.removeItem('newOrder')
    let newOrder = {
      products: selectedItems,
    }
    sessionStorage.setItem('newOrder', JSON.stringify(newOrder))
  }

  const handleClickClearAll = () => {
    store.dispatch(removeAllProducts())
  }

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
                isSelected={selectedItems.some(
                  (elem) => elem.productId === item.product.id,
                )}
                onSelect={handleSelect}
                onUnselect={handleUnselect}
              />
            ))}
          </Col>
          <Col xs={3} className="cart-controls">
            <div className="cart-controls-info">
              <span className="cart-controls-count">
                Выбрано позиций: {selectedItems.length}
              </span>
              <hr />
              <span className="cart-controls-totalPrice">
                Итого: {Math.round(countPrice() * 100) / 100} ₽
              </span>
              <a
                href="/order/confirm"
                className="cart-controls-checkout"
                onClick={() => handleClickCheckout()}>
                Оформить заказ
              </a>
            </div>
            <button
              className="cart-controls-clearAll"
              onClick={() => handleClickClearAll()}>
              <FontAwesomeIcon
                className="cart-controls-clearAll-icon"
                icon="fa-regular fa-trash-can"
              />
              Очистить корзину
            </button>
          </Col>
        </Row>
      )}
    </Container>
  )
}
