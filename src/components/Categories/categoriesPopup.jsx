import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCategories } from '../../services/categories'

import './categories.scss'

export const CategoriesPopup = ({ isOpen = false, onClose }) => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categoriesSlice)
  const [openSubcategory, setOpenSubcategory] = useState('')

  const handleCategoryToggle = (name) => {
    setOpenSubcategory(name)
  }

  useEffect(() => {
    GetCategories(dispatch)
  }, [])

  return (
    <div className={`categories-popup${isOpen == true ? ' open' : ''}`}>
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="categories-list-item"
            onMouseEnter={() => handleCategoryToggle(category?.name)}>
            <a href={`/products/${category.id}`} className="category-name">
              {category.name}
            </a>
            <FontAwesomeIcon
              className="category-icon"
              icon="fa-solid fa-angle-right"
            />
            <ul
              className={`subcategories-list ${
                openSubcategory == category?.name ? 'open' : ''
              }`}
              style={{
                top: index * -40 + 'px',
                minHeight: categories.length * 40,
              }}>
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
          </li>
        ))}
      </ul>
    </div>
  )
}
