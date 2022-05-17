import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { store } from './app/store'
import Layout from './components/Layout/Layout'
import Home from './components/Pages/Home/Home'
import Login from './components/Pages/Login/Login'
import { ProductsList } from './components/Pages/Products'
import PrivateRoute from './components/PrivateRoute'
import { tokenExpire, userAuthenticated } from './app/authSlice'
import { Profile, ProfileInfo, ProfileOrders } from './components/Pages/Profile'
import { Cart } from './components/Pages/Cart'
import { Order, OrderInfo } from './components/Pages/Order'

function App() {
  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token !== undefined && token !== null) {
      const { exp } = jwtDecode(token)

      if (exp * 1000 < Date.now()) {
        store.dispatch(tokenExpire())
      } else {
        store.dispatch(userAuthenticated({ token: token }))
      }
    }
  }, [])

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<ProductsList />}>
          <Route path=":categoryId" element={<ProductsList />}>
            <Route path=":subcategoryId" element={<ProductsList />} />
          </Route>
        </Route>
        <Route path="contacts" element={<>Контакты</>} />
        <Route path="delivery" element={<>Доставка</>} />
        <Route
          path="favorites"
          element={<PrivateRoute>Избранное</PrivateRoute>}
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }>
          <Route path="info" element={<ProfileInfo />} />
          <Route
            path="orders"
            element={
              <PrivateRoute>
                <ProfileOrders />
              </PrivateRoute>
            }
          />
          <Route path="settings" element={<ProfileInfo editMode />} />
        </Route>
        <Route
          path="cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }>
          <Route path="confirm" element={<OrderInfo />} />
        </Route>
        <Route path="payment-info" element={<>Способы оплаты</>} />
      </Routes>
    </Layout>
  )
}

export default App
