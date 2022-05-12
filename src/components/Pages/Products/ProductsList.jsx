import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from '../../../services/products'
import ProductCard from '../../ProductCard/ProductCard'

import './products.scss'

export const ProductsList = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const categoryId = params.categoryId
  const subcategoryId = params.subcategoryId
  const { loading, products, error } = useSelector(
    (state) => state.productsSlice,
  )

  useEffect(() => {
    if (subcategoryId) dispatch(getProductsBySubcategory(subcategoryId))
    else if (categoryId) dispatch(getProductsByCategory(categoryId))
    else dispatch(getAllProducts())
  }, [])

  return (
    <div className="products">
      <Row>
        <Col xs={3} className="products-controls"></Col>
        <Col xs={9} className="products-list">
          {loading === true ? (
            <div className="loader" style={{ height: 605 }}>
              <Oval />
            </div>
          ) : (
            <Row xs={4} className="products-list">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}
