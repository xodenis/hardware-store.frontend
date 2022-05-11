import { Carousel, CarouselItem, Container, Row } from 'react-bootstrap'
import slide1 from '../../assets/img/slide1.jpg'
import slide2 from '../../assets/img/slide2.jpg'
import ProductCard from '../../ProductCard/ProductCard'

import './home.scss'

const Home = () => {
  return (
    <div className="home">
      <Carousel>
        <CarouselItem>
          <img className="d-block w-100" src={slide1} alt="First slide" />
        </CarouselItem>
        <CarouselItem>
          <img className="d-block w-100" src={slide2} alt="First slide" />
        </CarouselItem>
      </Carousel>
      <Container>
        <Row className="row-cols-xs-4"></Row>
      </Container>
    </div>
  )
}

export default Home
