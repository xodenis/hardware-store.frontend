import { Container } from 'react-bootstrap'
import Footer from './Footer/Footer'
import Header from './Header/Header'

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="main">
        <Container className="main-container">{props.children}</Container>
      </main>
      <Footer />
    </>
  )
}

export default Layout
