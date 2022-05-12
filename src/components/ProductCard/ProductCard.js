import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import './productCard.scss'

const ProductCard = ({ product }) => {
  const params = useParams()
  const [count, setCount] = useState(1)
  console.log(params)

  const handleCountChange = (e) => {
    if (e.target.value) {
      if (e.target.value > product.totalCount) setCount(product.totalCount)
      else setCount(e.target.value)
    } else {
      setCount(1)
    }
  }

  const handleClicIncrement = () => {
    if (count < product.totalCount) setCount(+count + 1)
    else setCount(product.totalCount)
  }

  const handleClickDecrement = () => {
    if (count > 1) setCount(count - 1)
    else setCount(1)
  }

  return (
    <Col>
      <Col className="productCard">
        <button className="productCard-favorites">
          <FontAwesomeIcon icon="fa-regular fa-heart" />
        </button>
        <a href={`/product/${product.id}`}>
          <img
            className="productCard-image"
            src={'data:image/jpeg;base64,' + product.image}
          />
        </a>
        <a href={`/product/${product.id}`}>
          <span className="productCard-name">{product.name}</span>
        </a>
        <span className="productCard-price">
          {product.price + ' руб./' + product.priceInfo}
        </span>
        <div className="productCard-counter">
          <button
            className="productCard-counter-decrement"
            onClick={() => handleClickDecrement()}>
            <FontAwesomeIcon icon="fa-solid fa-minus" />
          </button>
          <input
            type="text"
            className="productCard-counter-count"
            value={count}
            onChange={handleCountChange}
          />
          <button
            className="productCard-counter-increment"
            onClick={() => handleClicIncrement()}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </button>
        </div>
        <button className="productCard-addToCart">В корзину</button>
      </Col>
    </Col>
  )
}

export default ProductCard
