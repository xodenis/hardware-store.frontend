import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Col, FormCheck, Row } from 'react-bootstrap'
import { store } from '../../app/store'
import { addProduct, removeProduct } from '../../services/cart'

import './productCard.scss'

const ProductCard = ({
  product,
  initialCount = 1,
  cartMode = false,
  orderMode = false,
  className = 'productCard',
  isSelected = false,
  onSelect,
  onUnselect,
}) => {
  const [count, setCount] = useState(initialCount)

  const handleCountChange = (e) => {
    if (e.target.value) {
      if (e.target.value > product.totalCount) setCount(product.totalCount)
      else setCount(e.target.value)
    } else {
      setCount(1)
    }
  }

  const handleClickIncrement = () => {
    if (count < product.totalCount) setCount(+count + 1)
    else setCount(product.totalCount)
  }

  const handleClickDecrement = () => {
    if (count > 1) setCount(count - 1)
    else setCount(1)
  }

  const addToCart = (productId, count) => {
    store.dispatch(addProduct({ productId, count }))
  }

  const CartItem = () => {
    const [selected, setSelected] = useState(isSelected)

    const handleChange = (e) => {
      if (e.target.checked === true) onSelect(product.id, initialCount)
      else onUnselect(product.id)
      setSelected(e.target.checked)
    }

    const handleClickRemove = (productId) => {
      store.dispatch(removeProduct(productId))
      if (selected) onUnselect(productId)
    }

    return (
      <Col className={`${className}`}>
        <div className={`${className}-content`}>
          <FormCheck
            type="checkbox"
            checked={selected}
            onChange={(e) => handleChange(e)}
          />
          <a href={`/product/${product.id}`} className={`${className}-image`}>
            <img
              src={'data:image/jpeg;base64,' + product.image}
              alt={product.name}
            />
          </a>
          <a
            href={`/product/${product.id}`}
            className={`${className}-name`}
            title={product.name}>
            <span>{product.name}</span>
          </a>
          <span className={`${className}-price`}>
            {product.price + ' ₽/' + product.priceInfo}
          </span>
          <div className={`${className}-counter`}>
            <button
              className={`${className}-counter-decrement`}
              onClick={() => handleClickDecrement()}>
              <FontAwesomeIcon icon="fa-solid fa-minus" />
            </button>
            <input
              type="text"
              className={`${className}-counter-count`}
              value={count}
              onChange={handleCountChange}
            />
            <button
              className={`${className}-counter-increment`}
              onClick={() => handleClickIncrement()}>
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
          </div>
          <span className={`${className}-totalPrice`}>
            {Math.round(initialCount * product.price * 100) / 100 + ' ₽'}
          </span>
          <button
            className={`${className}-remove`}
            onClick={() => handleClickRemove(product.id)}>
            <FontAwesomeIcon icon="fa-regular fa-trash-can" />
          </button>
        </div>
      </Col>
    )
  }

  const OrderItem = () => {
    return (
      <Col className={`${className}`}>
        <Row className={`${className}-content`}>
          <Col xs={7} className={`${className}-info`}>
            <a href={`/product/${product.id}`} className={`${className}-image`}>
              <img
                src={'data:image/jpeg;base64,' + product.image}
                alt={product.name}
              />
            </a>
            <a
              href={`/product/${product.id}`}
              className={`${className}-name`}
              title={product.name}>
              <span>{product.name}</span>
            </a>
          </Col>
          <Col xs={3} className={`${className}-count`}>
            <span>{initialCount + ' шт.'}</span>
          </Col>
          <Col xs={2}>
            <span className={`${className}-price`}>
              {product.price * initialCount + ' ₽'}
            </span>
          </Col>
        </Row>
      </Col>
    )
  }

  if (cartMode) return <CartItem />

  if (orderMode) return <OrderItem />

  return (
    <Col className={`${className}`}>
      <div className={`${className}-content`}>
        <button
          className={`${className}-favorites`}
          title="Добавить в избранное">
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        </button>
        <a href={`/product/${product.id}`} className={`${className}-image`}>
          <img
            src={'data:image/jpeg;base64,' + product.image}
            alt={product.name}
          />
        </a>
        <a
          href={`/product/${product.id}`}
          className={`${className}-name`}
          title={product.name}>
          <span>{product.name}</span>
        </a>
        <span className={`${className}-price`}>
          {product.price + ' руб./' + product.priceInfo}
        </span>
        <div className={`${className}-counter`}>
          <button
            className={`${className}-counter-decrement`}
            onClick={() => handleClickDecrement()}>
            <FontAwesomeIcon icon="fa-solid fa-minus" />
          </button>
          <input
            type="text"
            className={`${className}-counter-count`}
            value={count}
            onChange={handleCountChange}
          />
          <button
            className={`${className}-counter-increment`}
            onClick={() => handleClickIncrement()}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </button>
        </div>
        <button
          className={`${className}-addToCart`}
          onClick={() => addToCart(product.id, count)}>
          В корзину
        </button>
      </div>
    </Col>
  )
}

export default ProductCard
