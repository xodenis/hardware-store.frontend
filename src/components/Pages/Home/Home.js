import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { getByUser } from '../../../services/recommendations'
import { Container, Carousel, CarouselItem, Row } from 'react-bootstrap'
import { Categories } from '../../Categories'
import ProductCard from '../../ProductCard/ProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import slide1 from '../../assets/img/slide1.jpg'
import slide2 from '../../assets/img/slide2.jpg'

import './home.scss'

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.authSlice)
  const { recommendations } = useSelector((state) => state.recommendationsSlice)

  useEffect(() => {
    if (isAuthenticated) store.dispatch(getByUser())
  }, [])

  return (
    <Container className="main-container">
      <div className="home">
        <Carousel>
          <CarouselItem>
            <img className="d-block w-100" src={slide1} alt="First slide" />
          </CarouselItem>
          <CarouselItem>
            <img className="d-block w-100" src={slide2} alt="First slide" />
          </CarouselItem>
        </Carousel>
        <Categories />
        {recommendations?.length !== 0 && (
          <div className="home-recommendations">
            <div className="home-recommendations-title">
              <FontAwesomeIcon
                className="home-recommendations-title-icon"
                icon="fa-regular fa-star"
              />
              <h2 className="home-recommendations-title-text">
                Рекомендуемые товары
              </h2>
            </div>
            <Row xs={5} className="home-recommendations-list">
              {recommendations?.map((product) => (
                <ProductCard product={product} />
              ))}
            </Row>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Home
