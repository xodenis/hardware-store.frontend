import { Col } from 'react-bootstrap'

import './productCard.scss'

const ProductCard = ({ data }) => {
  console.log(data)
  return (
    <Col>
      <Col className="productCard">
        <img className="productCard-image" src={data.image} />
        <span className="productCard-name">{data.name}</span>
        <span className="productCard-price">{data.price}</span>
      </Col>
    </Col>
  )
}

export default ProductCard
