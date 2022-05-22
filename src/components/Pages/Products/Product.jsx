import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { store } from '../../../app/store'
import { addProduct } from '../../../services/cart'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../services/favorites'
import { getById } from '../../../services/products'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap'
import ProductCard from '../../ProductCard/ProductCard'

import './products.scss'
import { getByProduct } from '../../../services/recommendations'

export const Product = () => {
  const params = useParams()
  const [count, setCount] = useState(1)

  const { loading, product } = useSelector((state) => state.productsSlice)
  const { favorites } = useSelector((state) => state.favoritesSlice)
  const { recommendations } = useSelector((state) => state.recommendationsSlice)

  const isAlreadyInFavorites = favorites.products?.some(
    (item) => item.product.id === product.id,
  )

  const handleClickFavorites = (productId) => {
    if (isAlreadyInFavorites) store.dispatch(removeFromFavorites(productId))
    else store.dispatch(addToFavorites(productId))
  }

  const handleCountChange = (e) => {
    if (e.target.value) {
      if (e.target.value > product.totalCount) setCount(product.totalCount)
      else {
        setCount(e.target.value)
      }
    } else {
      setCount(1)
    }
  }

  const handleClickIncrement = () => {
    if (count < product.totalCount) {
      setCount(+count + 1)
    } else setCount(product.totalCount)
  }

  const handleClickDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    } else setCount(1)
  }

  const addToCart = (productId, count) => {
    store.dispatch(addProduct({ productId, count }))
  }

  const getCharacteristics = () => {
    let result = []
    const characteristics = product?.characteristics?.split(';')

    characteristics?.forEach((item) => {
      const splited = item?.split(':')
      result.push({ type: splited[0], value: splited[1] })
    })

    return result
  }

  useEffect(() => {
    store.dispatch(getById(params?.productId))
    store.dispatch(getByProduct(params?.productId))
  }, [])

  return (
    <div className="product">
      <Container>
        <div className="product-title">
          <h1 className="product-title-name">{product?.name}</h1>
          <span className="product-title-id">Код товара: {product?.id}</span>
        </div>
        <Row className="product-info">
          <Col xs={4}>
            <div className="product-info-image">
              <button
                className="product-info-favorites"
                title={
                  isAlreadyInFavorites
                    ? 'Удалить из избранного'
                    : 'Добавить в избранное'
                }
                onClick={() => handleClickFavorites(product?.id)}>
                {isAlreadyInFavorites ? (
                  <FontAwesomeIcon icon="fa-solid fa-heart" />
                ) : (
                  <FontAwesomeIcon icon="fa-regular fa-heart" />
                )}
              </button>
              <img
                src={'data:image/jpeg;base64,' + product?.image}
                alt={product?.name}
              />
            </div>
          </Col>
          <Col xs={8}>
            <div className="product-info-price">
              Цена:
              <span>{` ${product?.price} ₽/${product?.priceInfo}`}</span>
            </div>
            <div className="product-info-controls">
              <div className="product-info-controls-counter">
                <button
                  className="product-info-controls-counter-decrement"
                  onClick={() => handleClickDecrement()}>
                  <FontAwesomeIcon icon="fa-solid fa-minus" />
                </button>
                <input
                  type="text"
                  className="product-info-controls-counter-count"
                  value={count}
                  onChange={(e) => handleCountChange(e)}
                />
                <button
                  className="product-info-controls-counter-increment"
                  onClick={() => handleClickIncrement()}>
                  <FontAwesomeIcon icon="fa-solid fa-plus" />
                </button>
              </div>
              <button
                className="product-info-controls-addToCart"
                onClick={() => addToCart(product.id, count)}>
                В корзину
              </button>
            </div>
            <div className="product-info-totalPrice">
              Итоговая стоимость:
              <span>
                {Math.round(product?.price * count * 100) / 100 + ' ₽'}
              </span>
            </div>
            <span className="product-info-availability">
              Наличие товара:
              <b
                className={
                  product?.totalCount > 0 ? 'in-stock' : 'not-available'
                }>
                {product?.totalCount > 0 ? ' в наличии' : ' нет в наличии'}
              </b>
            </span>
          </Col>
        </Row>
      </Container>
      <div className="product-characteristics">
        <Container>
          <h2 className="product-characteristics-title">Характеристики</h2>
          <Row xs={2} className="product-characteristics-list">
            {getCharacteristics().map((item, index) => (
              <Col key={index} className="product-characteristics-list-item">
                <div className="product-characteristics-list-item-content">
                  <Col xs={6}>
                    <span className="characteristic-type">{item.type}</span>
                  </Col>
                  <Col xs={6}>
                    <span className="characteristic-value">{item.value}</span>
                  </Col>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Container className="product-recommendations">
        <div className="product-recommendations-title">
          <FontAwesomeIcon
            className="product-recommendations-title-icon"
            icon="fa-regular fa-star"
          />
          <h2 className="product-recommendations-title-text">
            Рекомендуемые товары
          </h2>
        </div>
        <Row xs={5} className="product-recommendations-list">
          {recommendations?.map((product) => (
            <ProductCard product={product} />
          ))}
        </Row>
      </Container>
    </div>
  )
}
