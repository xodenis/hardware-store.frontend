import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { store } from '../../../app/store'
import { getInfo } from '../../../services/user'
import { Col, Form, Row } from 'react-bootstrap'
import Input from '../../Input'
import { addOrder } from '../../../services/order'

export const OrderInfo = () => {
  const { user } = useSelector((state) => state.userSlice)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [deliveryType, setDeliveryType] = useState('shop')

  const handleClickConfirm = () => {
    let newOrder = JSON.parse(sessionStorage.getItem('newOrder'))

    newOrder.paymentMethod = paymentMethod
    newOrder.deliveryType = deliveryType

    store.dispatch(addOrder(newOrder))

    sessionStorage.removeItem('newOrder')
  }

  useEffect(() => {
    store.dispatch(getInfo())
  }, [])

  return (
    <>
      <h1 className="order-title">Оформление заказа</h1>
      <hr />
      <Row>
        <Col xs={6} className="order-info">
          <h2 className="order-info-title">Личные данные</h2>
          <div className="order-info-content">
            <Input
              name="surname"
              type="text"
              label="Фамилия"
              value={user.surname}
              readOnly
            />
            <Input
              name="name"
              type="text"
              label="Имя"
              value={user.name}
              readOnly
            />
            <Row className="order-info-contacts">
              <Col xs={6}>
                <Input
                  name="email"
                  type="text"
                  label="Электронная почта"
                  value={user.email}
                  readOnly
                />
              </Col>
              <Col xs={6}>
                <Input
                  name="phone"
                  type="text"
                  label="Телефон"
                  value={user.phone}
                  readOnly
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={6} className="order-payment-delivery">
          <div className="order-payment">
            <h2 className="order-payment-title">Способ оплаты</h2>
            <Form.Check
              type="radio"
              label="наличными при получении"
              checked={paymentMethod === 'cash' ? true : false}
              onChange={() => setPaymentMethod('cash')}
            />
            <Form.Check
              type="radio"
              label="банковской картой при получении"
              checked={paymentMethod === 'card' ? true : false}
              onChange={() => setPaymentMethod('card')}
            />
          </div>
          <div className="order-delivery">
            <h2 className="order-delivery-title">Куда доставить товар?</h2>
            <Form.Check
              type="radio"
              label="заберу в магазин"
              checked={deliveryType === 'shop' ? true : false}
              onChange={() => setDeliveryType('shop')}
            />
            <Form.Check
              type="radio"
              label={`на адрес ${user.city}, ${user.address}`}
              checked={deliveryType === 'address' ? true : false}
              onChange={() => setDeliveryType('address')}
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="order-controls">
        <Col xs={9}>
          <span>
            Нажимая кнопку "Оформить заказ", вы подтверждаете свою
            дееспособность, согласие на получение информации об оформлении и
            получении заказа, а также согласие на обработку персональных данных.
          </span>
        </Col>
        <Col xs={3}>
          <a
            href="/profile/orders"
            className="order-confirm"
            onClick={() => handleClickConfirm()}>
            Оформить заказ
          </a>
        </Col>
      </Row>
    </>
  )
}
