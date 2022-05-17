import { useEffect } from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { store } from '../../../app/store'
import { getOrders } from '../../../services/order'
import ProductCard from '../../ProductCard/ProductCard'

const status = {
  0: {
    key: 'created',
    name: 'Оформлен',
  },
  1: {
    key: 'in-delivery',
    name: 'В доставке',
  },
  2: {
    key: 'pending-in-store',
    name: 'Ожидает в магазине',
  },
  3: {
    key: 'completed',
    name: 'Завершён',
  },
}

export const ProfileOrders = () => {
  const { loading, orders } = useSelector((state) => state.orderSlice)

  const beautifulDate = (date) => {
    let result = new Date(date)
    let day = result.getDate() < 10 ? `0${result.getDate()}` : result.getDate()
    let month =
      result.getMonth() < 10 ? `0${result.getMonth() + 1}` : result.getMonth()

    return `${day}.${month}.${result.getFullYear()}`
  }

  function declOfNum(number) {
    const words = ['товар', 'товара', 'товаров']
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ]
  }

  useEffect(() => {
    store.dispatch(getOrders())
  }, [])

  return (
    <div className="profile-orders">
      <h2 className="profile-orders-title">Список заказов</h2>
      <div className="prodile-orders-list">
        {orders.map((order) => (
          <Accordion key={order.id} className="profile-orders-item">
            <Accordion.Header>
              <div className="profile-orders-item-header container-fluid">
                <Row>
                  <Col xs={4} className="profile-orders-item-number">
                    <span>
                      Заказ №{order.id}
                      <span className="profile-orders-item-date">
                        от {beautifulDate(order.date)}
                      </span>
                    </span>
                  </Col>
                  <Col xs={3} className="profile-orders-item-status">
                    <span className={`status ${status[order.status].key}`}>
                      {status[order.status].name}
                    </span>
                  </Col>
                  <Col xs={3} className="profile-orders-item-count">
                    <span>
                      {`${order.products.length} ${declOfNum(
                        order.products.length,
                      )}`}
                    </span>
                  </Col>
                  <Col xs={2} className="profile-orders-item-price">
                    <span>{order.price + ' ₽'}</span>
                  </Col>
                </Row>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {order.products.map((item) => (
                <ProductCard
                  key={item.product.id}
                  className="profile-orders-item-product"
                  product={item.product}
                  orderMode
                  initialCount={item.count}
                />
              ))}
            </Accordion.Body>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
