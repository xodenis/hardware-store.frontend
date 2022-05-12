import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategories } from '../../services/categories'

import './categories.scss'

export const Categories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categoriesSlice)

  useEffect(() => {
    GetCategories(dispatch)
  }, [])

  return (
    <div className="categories">
      <div className="categories-title">
        <FontAwesomeIcon
          className="categories-title-icon"
          icon="fa-solid fa-list"
        />
        <h1 className="categories-title-text">Категории товаров</h1>
      </div>
      <Row xs={3} className="categories-cards">
        {categories?.map((category) => (
          <Col key={category.id} className="categories-cards-container">
            <div className="categories-cards-item">
              <a href={`/products/${category.id}`} className="category-name">
                {category.name}
              </a>
              <ul className="subcategories-list">
                {category?.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="subcategories-list-item">
                    <a
                      href={`/products/${category.id}/${subcategory.id}`}
                      className="subcategory-name">
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
