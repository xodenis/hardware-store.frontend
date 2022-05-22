import { useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../../ProductCard/ProductCard'

import './favorites.scss'

export const Favorites = () => {
  const { favorites } = useSelector((state) => state.favoritesSlice)

  return (
    <Container className="main-container">
      <div className="favorites">
        <h1 className="favorites-title">Избранное</h1>
        {favorites?.products?.length == 0 ? (
          <h2 className="favorites-title-empty">Нет избранных товаров.</h2>
        ) : (
          <Row className="favorites-list" xs={5}>
            {favorites.products?.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </Row>
        )}
      </div>
    </Container>
  )
}
