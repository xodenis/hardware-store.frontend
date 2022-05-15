import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from '../../../services/products'

import { Container, Col, Row, Breadcrumb } from 'react-bootstrap'
import { Oval } from 'react-loader-spinner'
import MultiRangeSlider from 'multi-range-slider-react'
import ProductCard from '../../ProductCard/ProductCard'

import './products.scss'

export const ProductsList = () => {
  const dispatch = useDispatch()

  // Get params from url
  const params = useParams()
  const categoryId = params.categoryId
  const subcategoryId = params.subcategoryId

  // Declaring all states
  const [category, setCategory] = useState()
  const [subcategory, setSubcategory] = useState()
  const [productsList, setProductsList] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(9999)

  // Get data from redux state
  const { loading, products, maxProductsPrice } = useSelector(
    (state) => state.productsSlice,
  )
  const { categories } = useSelector((state) => state.categoriesSlice)

  const handlePriceInput = (e) => {
    setMinPrice(e.minValue)
    setMaxPrice(e.maxValue)
    setProductsList(
      products.filter(
        (item) => item.price >= e.minValue && item.price <= e.maxValue,
      ),
    )
  }

  useEffect(() => {
    if (subcategoryId) dispatch(getProductsBySubcategory(subcategoryId))
    else if (categoryId) dispatch(getProductsByCategory(categoryId))
    else dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    const category = categories.find((item) => item.id === +categoryId)
    const subcategory = category?.subcategories.find(
      (item) => item.id === +subcategoryId,
    )

    if (category) setCategory(category)
    if (subcategory) setSubcategory(subcategory)
  }, [categories])

  useEffect(() => {
    setProductsList(products)
  }, [products])

  useEffect(() => {
    setMaxPrice(maxProductsPrice)
  }, [maxProductsPrice])

  return (
    <>
      <div className="path">
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="/home">Главная</Breadcrumb.Item>
            {category?.name && (
              <Breadcrumb.Item
                href={`/products/${categoryId}`}
                active={subcategory ? false : true}>
                {category.name}
              </Breadcrumb.Item>
            )}
            {subcategory?.name && (
              <Breadcrumb.Item
                href={`/products/${categoryId}/${subcategoryId}`}
                active>
                {subcategory.name}
              </Breadcrumb.Item>
            )}
            {!category?.name && !subcategory?.name && (
              <Breadcrumb.Item href={`/products`} active>
                Список товаров
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </Container>
      </div>
      <Container className="main-container">
        <div className="products">
          <h1 className="products-title">
            {subcategory?.name
              ? subcategory?.name
              : category?.name
              ? category?.name
              : 'Список товаров'}
          </h1>
          <Row>
            <Col xs={3} className="products-controls">
              <div className="products-controls-content">
                {!subcategory && (
                  <div className="products-controls-subcategories">
                    <span className="products-controls-subcategories-title">
                      Доступные подкатегории
                    </span>
                    <hr className="products-controls-separate" />
                    <ul className="products-controls-subcategories-list">
                      {category?.subcategories.map((subcategory) => (
                        <li
                          key={subcategory.id}
                          className="products-controls-subcategories-list-item">
                          <a
                            href={`/products/${category.id}/${subcategory.id}`}
                            className="">
                            {subcategory.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="products-controls-price">
                  <span className="products-controls-price-title">
                    Цена (Рубли)
                  </span>
                  <hr className="products-controls-separate" />
                  <MultiRangeSlider
                    min={0}
                    max={maxProductsPrice}
                    step={10}
                    ruler={false}
                    label={true}
                    preventWheel={false}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onInput={handlePriceInput}
                    baseClassName="multi-range-slider products-controls-price-slider"
                  />
                </div>
              </div>
            </Col>
            <Col xs={9} className="products-list">
              {loading === true ? (
                <div className="loader" style={{ height: 605 }}>
                  <Oval />
                </div>
              ) : productsList.length === 0 ? (
                <h2>Упс, не найдено сопадений...</h2>
              ) : (
                <Row xs={4} className="products-list g-3">
                  {productsList?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}
