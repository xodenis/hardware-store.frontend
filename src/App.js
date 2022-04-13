import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<>Главная</>} />
        <Route path="contacts" element={<>Контакты</>} />
        <Route path="delivery" element={<>Доставка</>} />
        <Route path="favorites" element={<>Избранное</>} />
        <Route path="profile" element={<>Личный кабинет</>} />
        <Route path="cart" element={<>Корзина</>} />
        <Route path="payment-info" element={<>Способы оплаты</>} />
      </Routes>
    </Layout>
  )
}

export default App
